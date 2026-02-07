import { EngineeringBranch, SubjectImportance, CognitiveLoad } from '../types';

export interface SubjectTemplate {
  name: string;
  credits: number;
  defaultConfidence: number;
  importance: SubjectImportance;
  topics: Array<{
    name: string;
    cognitiveLoad: CognitiveLoad;
    prerequisites: string[];
  }>;
}

export const branchSubjectTemplates: Record<EngineeringBranch, SubjectTemplate[]> = {
  [EngineeringBranch.CSE]: [
    {
      name: 'Data Structures & Algorithms',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Arrays and Strings', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Linked Lists', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Arrays and Strings'] },
        { name: 'Stacks and Queues', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Linked Lists'] },
        { name: 'Trees and BST', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Linked Lists'] },
        { name: 'Graphs', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Trees and BST'] },
        { name: 'Hashing', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Arrays and Strings'] },
        { name: 'Sorting Algorithms', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Dynamic Programming', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Sorting Algorithms'] },
        { name: 'Greedy Algorithms', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Dynamic Programming'] }
      ]
    },
    {
      name: 'Operating Systems',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Processes and Threads', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'CPU Scheduling', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Processes and Threads'] },
        { name: 'Synchronization', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Processes and Threads'] },
        { name: 'Deadlocks', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Synchronization'] },
        { name: 'Memory Management', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Processes and Threads'] },
        { name: 'Virtual Memory', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Memory Management'] },
        { name: 'File Systems', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Memory Management'] }
      ]
    },
    {
      name: 'Database Management Systems',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'ER Model', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Relational Model', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['ER Model'] },
        { name: 'SQL Queries', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Relational Model'] },
        { name: 'Normalization', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Relational Model'] },
        { name: 'Transactions and ACID', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['SQL Queries'] },
        { name: 'Indexing and B-Trees', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['SQL Queries'] },
        { name: 'Query Optimization', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Indexing and B-Trees'] }
      ]
    },
    {
      name: 'Computer Networks',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'OSI and TCP/IP Model', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Data Link Layer', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['OSI and TCP/IP Model'] },
        { name: 'Network Layer and Routing', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Data Link Layer'] },
        { name: 'Transport Layer (TCP/UDP)', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Network Layer and Routing'] },
        { name: 'Application Layer Protocols', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Transport Layer (TCP/UDP)'] },
        { name: 'Network Security', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Application Layer Protocols'] }
      ]
    },
    {
      name: 'Object-Oriented Programming',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Classes and Objects', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Inheritance', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Classes and Objects'] },
        { name: 'Polymorphism', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Inheritance'] },
        { name: 'Abstraction and Encapsulation', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Classes and Objects'] },
        { name: 'Design Patterns', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Polymorphism'] },
        { name: 'SOLID Principles', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Design Patterns'] }
      ]
    },
    {
      name: 'Artificial Intelligence',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Search Algorithms', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Knowledge Representation', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Search Algorithms'] },
        { name: 'Logic and Reasoning', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Knowledge Representation'] },
        { name: 'Planning', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Search Algorithms'] },
        { name: 'Uncertainty and Probability', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Logic and Reasoning'] },
        { name: 'Neural Networks Basics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Uncertainty and Probability'] }
      ]
    },
    {
      name: 'Machine Learning',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Supervised Learning', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Linear Regression', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Supervised Learning'] },
        { name: 'Logistic Regression', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Linear Regression'] },
        { name: 'Decision Trees', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Supervised Learning'] },
        { name: 'SVM and Kernel Methods', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Logistic Regression'] },
        { name: 'Unsupervised Learning', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Supervised Learning'] },
        { name: 'Neural Networks', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Logistic Regression'] },
        { name: 'Model Evaluation', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Supervised Learning'] }
      ]
    },
    {
      name: 'Deep Learning',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Neural Network Fundamentals', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Backpropagation', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Neural Network Fundamentals'] },
        { name: 'CNNs', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Backpropagation'] },
        { name: 'RNNs and LSTMs', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Backpropagation'] },
        { name: 'Transfer Learning', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['CNNs'] },
        { name: 'GANs', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['CNNs'] },
        { name: 'Transformers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['RNNs and LSTMs'] }
      ]
    },
    {
      name: 'Data Science',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Data Collection', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Data Cleaning', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Data Collection'] },
        { name: 'Exploratory Data Analysis', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Data Cleaning'] },
        { name: 'Feature Engineering', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Exploratory Data Analysis'] },
        { name: 'Statistical Analysis', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Exploratory Data Analysis'] },
        { name: 'Data Visualization', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Exploratory Data Analysis'] }
      ]
    },
    {
      name: 'Software Engineering',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'SDLC Models', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Requirements Engineering', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['SDLC Models'] },
        { name: 'System Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Requirements Engineering'] },
        { name: 'Testing Strategies', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['System Design'] },
        { name: 'Agile and Scrum', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['SDLC Models'] },
        { name: 'DevOps Basics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Testing Strategies'] }
      ]
    },
    {
      name: 'Cloud Computing',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Cloud Service Models', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Virtualization', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Cloud Service Models'] },
        { name: 'AWS/Azure Basics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Cloud Service Models'] },
        { name: 'Containerization (Docker)', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Virtualization'] },
        { name: 'Kubernetes', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Containerization (Docker)'] },
        { name: 'Serverless Computing', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['AWS/Azure Basics'] }
      ]
    },
    {
      name: 'Cyber Security',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Security Fundamentals', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Cryptography', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Security Fundamentals'] },
        { name: 'Network Security', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Security Fundamentals'] },
        { name: 'Web Security', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Network Security'] },
        { name: 'Ethical Hacking', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Web Security'] },
        { name: 'Security Best Practices', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Ethical Hacking'] }
      ]
    }
  ],
  
  [EngineeringBranch.ECE]: [
    {
      name: 'Electronic Devices & Circuits',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Semiconductor Physics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Diodes and Applications', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Semiconductor Physics'] },
        { name: 'BJT and FET', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Diodes and Applications'] },
        { name: 'Amplifiers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['BJT and FET'] },
        { name: 'Oscillators', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Amplifiers'] }
      ]
    },
    {
      name: 'Digital Electronics',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Number Systems', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Boolean Algebra', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Number Systems'] },
        { name: 'Logic Gates', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Boolean Algebra'] },
        { name: 'Combinational Circuits', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Logic Gates'] },
        { name: 'Sequential Circuits', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Combinational Circuits'] },
        { name: 'Memory Devices', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Sequential Circuits'] }
      ]
    },
    {
      name: 'Signals & Systems',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Signal Classification', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Fourier Series', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Signal Classification'] },
        { name: 'Fourier Transform', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Fourier Series'] },
        { name: 'Laplace Transform', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Fourier Transform'] },
        { name: 'Z-Transform', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Laplace Transform'] }
      ]
    },
    {
      name: 'Communication Systems',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Amplitude Modulation', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Frequency Modulation', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Amplitude Modulation'] },
        { name: 'Digital Modulation', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Frequency Modulation'] },
        { name: 'Noise Analysis', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Digital Modulation'] },
        { name: 'Information Theory', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Digital Modulation'] }
      ]
    },
    {
      name: 'Microprocessors & Microcontrollers',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: '8086 Architecture', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Instruction Set', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['8086 Architecture'] },
        { name: 'Assembly Programming', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Instruction Set'] },
        { name: 'Interfacing', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Assembly Programming'] },
        { name: 'Microcontroller Applications', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Interfacing'] }
      ]
    },
    {
      name: 'Electromagnetic Theory',
      credits: 3,
      defaultConfidence: 2,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Electrostatics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Magnetostatics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Electrostatics'] },
        { name: 'Maxwells Equations', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Magnetostatics'] },
        { name: 'Wave Propagation', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Maxwells Equations'] }
      ]
    },
    {
      name: 'VLSI Design',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'CMOS Technology', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Logic Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['CMOS Technology'] },
        { name: 'Layout Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Logic Design'] },
        { name: 'Timing Analysis', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Layout Design'] }
      ]
    },
    {
      name: 'Embedded Systems',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Embedded System Basics', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Real-Time OS', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Embedded System Basics'] },
        { name: 'Hardware Interfacing', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Embedded System Basics'] },
        { name: 'Embedded C Programming', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Hardware Interfacing'] }
      ]
    },
    {
      name: 'Control Systems',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'System Modeling', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Transfer Functions', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['System Modeling'] },
        { name: 'Time Response', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Transfer Functions'] },
        { name: 'Stability Analysis', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Time Response'] },
        { name: 'Controllers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Stability Analysis'] }
      ]
    }
  ],
  
  [EngineeringBranch.MECHANICAL]: [
    {
      name: 'Engineering Thermodynamics',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Basic Concepts', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'First Law', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Basic Concepts'] },
        { name: 'Second Law', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['First Law'] },
        { name: 'Entropy', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Second Law'] },
        { name: 'Power Cycles', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Entropy'] },
        { name: 'Refrigeration Cycles', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Power Cycles'] }
      ]
    },
    {
      name: 'Fluid Mechanics & Hydraulic Machines',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Fluid Properties', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Fluid Statics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Fluid Properties'] },
        { name: 'Fluid Dynamics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Fluid Statics'] },
        { name: 'Bernoullis Equation', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Fluid Dynamics'] },
        { name: 'Flow Measurement', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Bernoullis Equation'] },
        { name: 'Pumps and Turbines', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Flow Measurement'] }
      ]
    },
    {
      name: 'Strength of Materials',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Stress and Strain', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Bending Moment', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Stress and Strain'] },
        { name: 'Shear Force', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Bending Moment'] },
        { name: 'Torsion', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Stress and Strain'] },
        { name: 'Deflection of Beams', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Bending Moment'] }
      ]
    },
    {
      name: 'Theory of Machines',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Mechanisms', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Kinematics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Mechanisms'] },
        { name: 'Dynamics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Kinematics'] },
        { name: 'Balancing', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Dynamics'] },
        { name: 'Vibrations', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Dynamics'] }
      ]
    },
    {
      name: 'Machine Design',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Design Process', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Fasteners', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Design Process'] },
        { name: 'Shafts', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Fasteners'] },
        { name: 'Gears', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Shafts'] },
        { name: 'Bearings', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Shafts'] }
      ]
    },
    {
      name: 'Manufacturing Processes',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Casting', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Welding', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Casting'] },
        { name: 'Machining', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Welding'] },
        { name: 'Forming', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Machining'] }
      ]
    },
    {
      name: 'Heat Transfer',
      credits: 3,
      defaultConfidence: 2,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Conduction', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Convection', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Conduction'] },
        { name: 'Radiation', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Convection'] },
        { name: 'Heat Exchangers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Convection'] }
      ]
    },
    {
      name: 'CAD/CAM',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'CAD Fundamentals', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: '3D Modeling', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['CAD Fundamentals'] },
        { name: 'CNC Programming', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['3D Modeling'] },
        { name: 'CAM Applications', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['CNC Programming'] }
      ]
    },
    {
      name: 'Mechatronics',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Sensors and Actuators', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Microcontrollers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Sensors and Actuators'] },
        { name: 'PLC Programming', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Microcontrollers'] },
        { name: 'Automation Systems', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['PLC Programming'] }
      ]
    },
    {
      name: 'Industrial Engineering & Management',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.LOW,
      topics: [
        { name: 'Production Planning', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Inventory Management', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Production Planning'] },
        { name: 'Quality Control', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Production Planning'] },
        { name: 'Operations Research', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Inventory Management'] }
      ]
    }
  ],
  
  [EngineeringBranch.CIVIL]: [
    {
      name: 'Engineering Mathematics',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Calculus', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Linear Algebra', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Calculus'] },
        { name: 'Differential Equations', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Calculus'] },
        { name: 'Probability & Statistics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Numerical Methods', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Differential Equations'] }
      ]
    },
    {
      name: 'Engineering Mechanics',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Statics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Dynamics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Statics'] },
        { name: 'Kinematics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Dynamics'] },
        { name: 'Kinetics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Kinematics'] }
      ]
    },
    {
      name: 'Strength of Materials',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Stress and Strain', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Bending Stress', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Stress and Strain'] },
        { name: 'Shear Stress', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Bending Stress'] },
        { name: 'Torsion', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Stress and Strain'] },
        { name: 'Deflection', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Bending Stress'] }
      ]
    },
    {
      name: 'Structural Analysis',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Types of Structures', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Determinate Structures', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Types of Structures'] },
        { name: 'Indeterminate Structures', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Determinate Structures'] },
        { name: 'Influence Lines', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Indeterminate Structures'] },
        { name: 'Matrix Methods', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Influence Lines'] }
      ]
    },
    {
      name: 'Reinforced Cement Concrete (RCC)',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'RCC Fundamentals', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Beam Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['RCC Fundamentals'] },
        { name: 'Slab Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Beam Design'] },
        { name: 'Column Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Beam Design'] },
        { name: 'Foundation Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Column Design'] }
      ]
    },
    {
      name: 'Geotechnical Engineering',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Soil Classification', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Soil Compaction', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Soil Classification'] },
        { name: 'Shear Strength', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Soil Compaction'] },
        { name: 'Bearing Capacity', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Shear Strength'] },
        { name: 'Foundation Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Bearing Capacity'] },
        { name: 'Slope Stability', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Shear Strength'] }
      ]
    },
    {
      name: 'Fluid Mechanics',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Fluid Properties', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Fluid Statics', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Fluid Properties'] },
        { name: 'Fluid Dynamics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Fluid Statics'] },
        { name: 'Flow Measurement', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Fluid Dynamics'] }
      ]
    },
    {
      name: 'Hydrology',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Hydrologic Cycle', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Precipitation', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Hydrologic Cycle'] },
        { name: 'Runoff', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Precipitation'] },
        { name: 'Flood Routing', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Runoff'] }
      ]
    },
    {
      name: 'Transportation Engineering',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Highway Planning', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Geometric Design', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Highway Planning'] },
        { name: 'Pavement Design', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Geometric Design'] },
        { name: 'Traffic Engineering', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Highway Planning'] }
      ]
    },
    {
      name: 'Environmental Engineering',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Water Supply', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Wastewater Treatment', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Water Supply'] },
        { name: 'Air Pollution', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Solid Waste Management', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Wastewater Treatment'] }
      ]
    }
  ],
  
  [EngineeringBranch.ELECTRICAL]: [
    {
      name: 'Electrical Circuits',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Ohms Law', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Kirchhoffs Laws', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Ohms Law'] },
        { name: 'Network Theorems', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Kirchhoffs Laws'] },
        { name: 'AC Circuits', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Network Theorems'] },
        { name: 'Resonance', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['AC Circuits'] }
      ]
    },
    {
      name: 'Network Analysis',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Mesh Analysis', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Nodal Analysis', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Mesh Analysis'] },
        { name: 'Thevenin and Norton', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Nodal Analysis'] },
        { name: 'Two-Port Networks', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Thevenin and Norton'] }
      ]
    },
    {
      name: 'Electrical Machines',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'DC Machines', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Transformers', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['DC Machines'] },
        { name: 'Induction Motors', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Transformers'] },
        { name: 'Synchronous Machines', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Induction Motors'] }
      ]
    },
    {
      name: 'Power Systems',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.CRITICAL,
      topics: [
        { name: 'Generation', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Transmission', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Generation'] },
        { name: 'Distribution', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Transmission'] },
        { name: 'Protection', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Distribution'] },
        { name: 'Load Flow', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Transmission'] }
      ]
    },
    {
      name: 'Power Electronics',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Diodes', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Thyristors', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Diodes'] },
        { name: 'Converters', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Thyristors'] },
        { name: 'Inverters', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Converters'] },
        { name: 'Choppers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Converters'] }
      ]
    },
    {
      name: 'Control Systems',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'System Modeling', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Transfer Functions', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['System Modeling'] },
        { name: 'Time Response', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Transfer Functions'] },
        { name: 'Stability Analysis', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Time Response'] },
        { name: 'Controllers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Stability Analysis'] }
      ]
    },
    {
      name: 'Signals & Systems',
      credits: 3,
      defaultConfidence: 2,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Signal Classification', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Fourier Analysis', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Signal Classification'] },
        { name: 'Laplace Transform', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Fourier Analysis'] },
        { name: 'Z-Transform', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Laplace Transform'] }
      ]
    },
    {
      name: 'Electrical Measurements',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Measurement Basics', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Analog Instruments', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Measurement Basics'] },
        { name: 'Digital Instruments', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Analog Instruments'] },
        { name: 'Transducers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Digital Instruments'] }
      ]
    },
    {
      name: 'High Voltage Engineering',
      credits: 3,
      defaultConfidence: 2,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Breakdown Mechanisms', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Insulation Testing', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Breakdown Mechanisms'] },
        { name: 'Overvoltage Protection', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Insulation Testing'] }
      ]
    },
    {
      name: 'Renewable Energy Systems',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Solar Energy', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Wind Energy', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Solar Energy'] },
        { name: 'Energy Storage', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Wind Energy'] },
        { name: 'Grid Integration', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Energy Storage'] }
      ]
    }
  ],
  
  [EngineeringBranch.OTHER]: [
    {
      name: 'Mathematics for AI',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Calculus', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Linear Algebra', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Calculus'] },
        { name: 'Probability & Statistics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Calculus'] },
        { name: 'Optimization', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Linear Algebra'] }
      ]
    },
    {
      name: 'Natural Language Processing',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Text Preprocessing', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Language Models', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Text Preprocessing'] },
        { name: 'Word Embeddings', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Language Models'] },
        { name: 'Transformers', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Word Embeddings'] },
        { name: 'Sentiment Analysis', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Language Models'] }
      ]
    },
    {
      name: 'Computer Vision',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Image Processing', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Feature Detection', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Image Processing'] },
        { name: 'CNNs for Vision', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Feature Detection'] },
        { name: 'Object Detection', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['CNNs for Vision'] },
        { name: 'Image Segmentation', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Object Detection'] }
      ]
    },
    {
      name: 'Big Data Analytics',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Hadoop Ecosystem', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'MapReduce', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Hadoop Ecosystem'] },
        { name: 'Spark', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['MapReduce'] },
        { name: 'NoSQL Databases', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Hadoop Ecosystem'] },
        { name: 'Stream Processing', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Spark'] }
      ]
    },
    {
      name: 'Internet of Things (IoT)',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'IoT Fundamentals', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Sensors & Actuators', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['IoT Fundamentals'] },
        { name: 'IoT Communication Protocols', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Sensors & Actuators'] },
        { name: 'Edge Computing', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['IoT Communication Protocols'] },
        { name: 'IoT Security', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Edge Computing'] }
      ]
    },
    {
      name: 'Cyber Security',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Security Fundamentals', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Cryptography', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Security Fundamentals'] },
        { name: 'Network Security', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Security Fundamentals'] },
        { name: 'Ethical Hacking', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Network Security'] },
        { name: 'Digital Forensics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Ethical Hacking'] },
        { name: 'Security Governance', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Security Fundamentals'] }
      ]
    },
    {
      name: 'Data Science',
      credits: 4,
      defaultConfidence: 3,
      importance: SubjectImportance.HIGH,
      topics: [
        { name: 'Data Collection', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Data Cleaning', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Data Collection'] },
        { name: 'Exploratory Data Analysis', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Data Cleaning'] },
        { name: 'Feature Engineering', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Exploratory Data Analysis'] },
        { name: 'Data Visualization', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Exploratory Data Analysis'] },
        { name: 'Data Ethics & Privacy', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Data Collection'] }
      ]
    },
    {
      name: 'Robotics & Automation',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Robotics Fundamentals', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Kinematics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Robotics Fundamentals'] },
        { name: 'Sensors & Actuators', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Robotics Fundamentals'] },
        { name: 'PLC & SCADA', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Sensors & Actuators'] },
        { name: 'Autonomous Systems', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Kinematics'] }
      ]
    },
    {
      name: 'Biotechnology',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.LOW,
      topics: [
        { name: 'Cell Biology', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Genetics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Cell Biology'] },
        { name: 'Molecular Biology', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Genetics'] },
        { name: 'Bioprocess Engineering', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Molecular Biology'] }
      ]
    },
    {
      name: 'Chemical Engineering',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.LOW,
      topics: [
        { name: 'Chemical Process Calculations', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Thermodynamics', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Chemical Process Calculations'] },
        { name: 'Heat Transfer', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Thermodynamics'] },
        { name: 'Mass Transfer', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Heat Transfer'] }
      ]
    },
    {
      name: 'Project Management',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Project Planning', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Risk Management', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Project Planning'] },
        { name: 'Agile Methodologies', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Project Planning'] },
        { name: 'Resource Management', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Risk Management'] }
      ]
    },
    {
      name: 'Entrepreneurship',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.LOW,
      topics: [
        { name: 'Business Models', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Market Analysis', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Business Models'] },
        { name: 'Funding & Finance', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Market Analysis'] },
        { name: 'Startup Strategy', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Funding & Finance'] }
      ]
    },
    {
      name: 'DevOps & CI/CD',
      credits: 3,
      defaultConfidence: 3,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'Version Control', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Continuous Integration', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Version Control'] },
        { name: 'Continuous Deployment', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Continuous Integration'] },
        { name: 'Infrastructure as Code', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Continuous Deployment'] }
      ]
    },
    {
      name: 'Reinforcement Learning',
      credits: 4,
      defaultConfidence: 2,
      importance: SubjectImportance.MEDIUM,
      topics: [
        { name: 'MDP Fundamentals', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: [] },
        { name: 'Q-Learning', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['MDP Fundamentals'] },
        { name: 'Policy Gradients', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Q-Learning'] },
        { name: 'Deep RL', cognitiveLoad: CognitiveLoad.HIGH, prerequisites: ['Policy Gradients'] }
      ]
    },
    {
      name: 'Ethics & Responsible AI',
      credits: 2,
      defaultConfidence: 4,
      importance: SubjectImportance.LOW,
      topics: [
        { name: 'AI Ethics Principles', cognitiveLoad: CognitiveLoad.LOW, prerequisites: [] },
        { name: 'Bias & Fairness', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['AI Ethics Principles'] },
        { name: 'Privacy & Security', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['AI Ethics Principles'] },
        { name: 'Responsible AI Practices', cognitiveLoad: CognitiveLoad.MEDIUM, prerequisites: ['Bias & Fairness'] }
      ]
    }
  ]
};

export function getBranchSubjects(branch: EngineeringBranch): SubjectTemplate[] {
  return branchSubjectTemplates[branch] || branchSubjectTemplates[EngineeringBranch.OTHER];
}

export function getAllBranchSubjects(): SubjectTemplate[] {
  const allSubjects: SubjectTemplate[] = [];
  Object.values(branchSubjectTemplates).forEach(subjects => {
    allSubjects.push(...subjects);
  });
  return allSubjects;
}
