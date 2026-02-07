# AWS Architecture: AI Study Planner

## Overview

This document outlines the AWS architecture for scaling the AI Study Planner from a hackathon MVP (client-side only) to a production-ready SaaS application.

---

## Phase 1: Hackathon MVP (Client-Side Only)

### Architecture
```
┌─────────────────────────────────────────┐
│         Static Hosting (Vercel)         │
│  ┌───────────────────────────────────┐  │
│  │   React SPA (TypeScript)          │  │
│  │   - Zustand State Management      │  │
│  │   - LocalStorage Persistence      │  │
│  │   - Client-Side Scheduling Logic  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Components
- **Frontend**: React + TypeScript SPA
- **State**: Zustand with LocalStorage
- **Hosting**: Vercel/Netlify (free tier)
- **Data**: 100% client-side, no backend

### Cost: $0/month

---

## Phase 2: Production MVP (AWS Serverless)

### High-Level Architecture
```
┌──────────────┐
│   Students   │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│              CloudFront (CDN)                            │
│              SSL/TLS Termination                         │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐          ┌──────────────────┐
│   S3 Bucket  │          │   API Gateway    │
│  (React SPA) │          │   (REST API)     │
└──────────────┘          └────────┬─────────┘
                                   │
                          ┌────────┴────────┐
                          │                 │
                          ▼                 ▼
                  ┌──────────────┐  ┌──────────────┐
                  │   Lambda     │  │   Lambda     │
                  │  (Auth)      │  │  (Schedule)  │
                  └──────┬───────┘  └──────┬───────┘
                         │                 │
                         ▼                 ▼
                  ┌──────────────────────────┐
                  │      DynamoDB            │
                  │  - Users Table           │
                  │  - Schedules Table       │
                  │  - Sessions Table        │
                  └──────────────────────────┘
```

### AWS Services

#### 1. Frontend Hosting
- **S3**: Static website hosting for React build
- **CloudFront**: CDN for global distribution
- **Route 53**: DNS management
- **ACM**: SSL/TLS certificates

#### 2. API Layer
- **API Gateway**: RESTful API endpoints
  - `/auth/*` - Authentication endpoints
  - `/profile/*` - User profile management
  - `/subjects/*` - Subject CRUD operations
  - `/schedule/*` - Schedule generation and updates
  - `/sessions/*` - Session tracking
  - `/progress/*` - Progress analytics

#### 3. Compute
- **Lambda Functions**:
  - `auth-handler`: User registration, login, JWT validation
  - `profile-handler`: Profile CRUD operations
  - `schedule-generator`: Core scheduling algorithm
  - `session-tracker`: Session completion and feedback
  - `progress-calculator`: Progress analytics
  - `notification-sender`: Email/push notifications

#### 4. Database
- **DynamoDB Tables**:
  
  **Users Table**
  ```
  PK: userId (String)
  Attributes:
    - email
    - name
    - college
    - branch
    - graduationYear
    - studyAvailability
    - preferredStudyTime
    - createdAt
    - updatedAt
  ```
  
  **Subjects Table**
  ```
  PK: userId (String)
  SK: subjectId (String)
  Attributes:
    - name
    - credits
    - topics (List)
    - confidence
    - importance
    - deadlines
    - isInterestSubject
  ```
  
  **Schedules Table**
  ```
  PK: userId (String)
  SK: scheduleId (String)
  Attributes:
    - sessions (List)
    - generatedAt
    - version
    - metadata
  GSI: scheduleId-index
  ```
  
  **Sessions Table**
  ```
  PK: userId (String)
  SK: sessionId (String)
  Attributes:
    - topicId
    - subjectId
    - scheduledDate
    - startTime
    - duration
    - status
    - difficultyFeedback
    - completedAt
  GSI: scheduledDate-index
  ```

#### 5. Authentication
- **Cognito User Pool**: User authentication and management
- **Cognito Identity Pool**: Temporary AWS credentials for authenticated users

#### 6. Notifications (Optional)
- **SNS**: Push notifications
- **SES**: Email notifications for reminders

#### 7. Monitoring & Logging
- **CloudWatch**: Logs, metrics, alarms
- **X-Ray**: Distributed tracing for Lambda functions

---

## Detailed Component Architecture

### Lambda Function: Schedule Generator

```typescript
// schedule-generator Lambda
export const handler = async (event: APIGatewayEvent) => {
  const userId = event.requestContext.authorizer.claims.sub;
  const { subjects, targetDate } = JSON.parse(event.body);
  
  // 1. Fetch user profile from DynamoDB
  const profile = await dynamodb.get({
    TableName: 'Users',
    Key: { userId }
  });
  
  // 2. Run scheduling algorithm
  const schedule = generateSchedule({
    student: profile.Item,
    subjects,
    startDate: new Date(),
    endDate: new Date(targetDate)
  });
  
  // 3. Save schedule to DynamoDB
  await dynamodb.put({
    TableName: 'Schedules',
    Item: {
      userId,
      scheduleId: generateId(),
      ...schedule,
      generatedAt: new Date().toISOString()
    }
  });
  
  // 4. Return schedule
  return {
    statusCode: 200,
    body: JSON.stringify(schedule)
  };
};
```

### API Gateway Endpoints

```yaml
/api/v1:
  /auth:
    /register:
      POST: Create new user account
    /login:
      POST: Authenticate user
    /refresh:
      POST: Refresh JWT token
  
  /profile:
    GET: Get user profile
    PUT: Update user profile
  
  /subjects:
    GET: List all subjects
    POST: Create new subject
    /{subjectId}:
      GET: Get subject details
      PUT: Update subject
      DELETE: Delete subject
  
  /schedule:
    POST: Generate new schedule
    GET: Get current schedule
    PUT: Update schedule
    /regenerate:
      POST: Regenerate schedule with new parameters
  
  /sessions:
    GET: List sessions
    /{sessionId}:
      GET: Get session details
      PUT: Update session (complete, feedback)
      /start:
        POST: Start session timer
      /complete:
        POST: Complete session with feedback
  
  /progress:
    GET: Get overall progress
    /subjects/{subjectId}:
      GET: Get subject-specific progress
    /topics/{topicId}:
      GET: Get topic-specific progress
```

---

## Security Architecture

### Authentication Flow
```
1. User → Cognito User Pool (Login)
2. Cognito → JWT Token
3. User → API Gateway (JWT in Authorization header)
4. API Gateway → Lambda Authorizer (Validate JWT)
5. Lambda Authorizer → Allow/Deny
6. API Gateway → Lambda Function (with userId)
```

### Security Best Practices
- **Encryption at Rest**: DynamoDB encryption enabled
- **Encryption in Transit**: HTTPS only (CloudFront + ACM)
- **IAM Roles**: Least privilege for Lambda functions
- **API Keys**: Rate limiting on API Gateway
- **CORS**: Restricted to frontend domain only
- **Input Validation**: All Lambda functions validate inputs
- **Secrets Management**: AWS Secrets Manager for API keys

---

## Scalability & Performance

### Auto-Scaling
- **Lambda**: Automatic scaling (up to 1000 concurrent executions)
- **DynamoDB**: On-demand capacity mode (auto-scales)
- **API Gateway**: Handles 10,000 requests/second by default
- **CloudFront**: Global edge locations for low latency

### Performance Optimizations
- **CloudFront Caching**: Cache static assets (1 year TTL)
- **API Gateway Caching**: Cache GET requests (5 min TTL)
- **DynamoDB DAX**: In-memory cache for hot data (optional)
- **Lambda Provisioned Concurrency**: Pre-warmed functions for critical paths

### Cost Optimization
- **Lambda**: Pay per invocation (free tier: 1M requests/month)
- **DynamoDB**: On-demand pricing (pay per request)
- **S3**: Standard storage with lifecycle policies
- **CloudFront**: Free tier: 1TB data transfer/month

---

## Monitoring & Observability

### CloudWatch Dashboards
```
┌─────────────────────────────────────────┐
│     AI Study Planner Dashboard          │
├─────────────────────────────────────────┤
│  API Gateway Metrics:                   │
│  - Request count                        │
│  - Latency (p50, p99)                   │
│  - Error rate (4xx, 5xx)                │
├─────────────────────────────────────────┤
│  Lambda Metrics:                        │
│  - Invocations                          │
│  - Duration                             │
│  - Errors                               │
│  - Throttles                            │
├─────────────────────────────────────────┤
│  DynamoDB Metrics:                      │
│  - Read/Write capacity                  │
│  - Throttled requests                   │
│  - Latency                              │
└─────────────────────────────────────────┘
```

### Alarms
- **High Error Rate**: > 5% errors in 5 minutes
- **High Latency**: p99 > 3 seconds
- **Lambda Throttling**: Any throttled invocations
- **DynamoDB Throttling**: Any throttled requests

### Logging Strategy
- **Application Logs**: Structured JSON logs in CloudWatch
- **Access Logs**: API Gateway access logs
- **Audit Logs**: User actions (login, schedule changes)
- **Error Logs**: Detailed error traces with X-Ray

---

## Deployment Pipeline (CI/CD)

### GitHub Actions Workflow
```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build Frontend
        run: |
          npm install
          npm run build
      
      - name: Deploy to S3
        run: |
          aws s3 sync build/ s3://ai-study-planner-frontend
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CF_DIST_ID }} \
            --paths "/*"
      
      - name: Deploy Lambda Functions
        run: |
          cd lambda
          sam build
          sam deploy --no-confirm-changeset
```

### Infrastructure as Code (IaC)
- **AWS SAM**: Define Lambda functions and API Gateway
- **CloudFormation**: Provision all AWS resources
- **Terraform** (Alternative): Multi-cloud support

---

## Cost Estimation

### Monthly Costs (1,000 Active Users)

| Service | Usage | Cost |
|---------|-------|------|
| S3 | 1 GB storage | $0.02 |
| CloudFront | 10 GB data transfer | $0.85 |
| API Gateway | 1M requests | $3.50 |
| Lambda | 1M invocations, 512MB, 1s avg | $0.20 |
| DynamoDB | 1M reads, 500K writes | $1.25 |
| Cognito | 1,000 MAU | Free |
| CloudWatch | Logs + Metrics | $5.00 |
| **Total** | | **~$11/month** |

### Scaling Costs (10,000 Active Users)
- **Total**: ~$80/month

### Scaling Costs (100,000 Active Users)
- **Total**: ~$600/month

---

## Disaster Recovery & Backup

### Backup Strategy
- **DynamoDB**: Point-in-time recovery (PITR) enabled
- **S3**: Versioning enabled for frontend assets
- **Lambda**: Code stored in S3 with versioning

### Recovery Objectives
- **RTO** (Recovery Time Objective): < 1 hour
- **RPO** (Recovery Point Objective): < 5 minutes

### Multi-Region Setup (Optional)
```
Primary Region: us-east-1
Backup Region: us-west-2

- DynamoDB Global Tables (cross-region replication)
- S3 Cross-Region Replication
- Route 53 Health Checks + Failover
```

---

## Future Enhancements

### Phase 3: Advanced Features
- **ML Model**: AWS SageMaker for personalized time estimation
- **Real-time Updates**: WebSocket API (API Gateway WebSocket)
- **Mobile App**: AWS Amplify for React Native
- **Analytics**: Amazon QuickSight for admin dashboards
- **Search**: Amazon OpenSearch for subject/topic search
- **File Storage**: S3 for study materials (notes, PDFs)

### Phase 4: Enterprise Features
- **Multi-tenancy**: Separate DynamoDB tables per institution
- **SSO Integration**: SAML/OAuth with Cognito
- **Admin Portal**: Separate admin dashboard
- **Reporting**: Automated weekly reports via SES
- **Data Export**: Scheduled exports to S3

---

## Architecture Diagram (ASCII)

```
                                    ┌─────────────┐
                                    │   Students  │
                                    └──────┬──────┘
                                           │
                                           ▼
                        ┌──────────────────────────────────┐
                        │   Route 53 (DNS)                 │
                        │   studyplanner.com               │
                        └────────────┬─────────────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────────────┐
                        │   CloudFront (CDN)               │
                        │   - SSL/TLS                      │
                        │   - Global Edge Locations        │
                        └────────┬─────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
        ┌───────────────────┐     ┌──────────────────────┐
        │   S3 Bucket       │     │   API Gateway        │
        │   (React SPA)     │     │   /api/v1/*          │
        └───────────────────┘     └──────────┬───────────┘
                                              │
                                              ▼
                                  ┌───────────────────────┐
                                  │   Lambda Authorizer   │
                                  │   (JWT Validation)    │
                                  └──────────┬────────────┘
                                             │
                        ┌────────────────────┼────────────────────┐
                        │                    │                    │
                        ▼                    ▼                    ▼
            ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
            │   Lambda         │ │   Lambda         │ │   Lambda         │
            │   (Auth)         │ │   (Schedule Gen) │ │   (Session)      │
            └────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
                     │                    │                    │
                     └────────────────────┼────────────────────┘
                                          │
                                          ▼
                            ┌──────────────────────────┐
                            │   DynamoDB               │
                            │   - Users                │
                            │   - Subjects             │
                            │   - Schedules            │
                            │   - Sessions             │
                            └──────────────────────────┘
                                          │
                                          ▼
                            ┌──────────────────────────┐
                            │   CloudWatch             │
                            │   - Logs                 │
                            │   - Metrics              │
                            │   - Alarms               │
                            └──────────────────────────┘
```

---

## Summary

This AWS architecture provides:
- ✅ **Serverless**: No server management, auto-scaling
- ✅ **Cost-Effective**: Pay only for what you use (~$11/month for 1K users)
- ✅ **Scalable**: Handles 100K+ users without changes
- ✅ **Secure**: Cognito auth, encryption, IAM roles
- ✅ **Fast**: CloudFront CDN, Lambda edge locations
- ✅ **Reliable**: Multi-AZ by default, 99.99% SLA
- ✅ **Observable**: CloudWatch monitoring and alarms

**Hackathon Note**: Start with Phase 1 (client-side only). Mention Phase 2 architecture in your presentation to show scalability vision.
