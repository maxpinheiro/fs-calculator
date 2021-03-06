var basevalues = {
    'A': {
        '1': 1.1,
        '1<': 0.88,
        '2': 3.3,
        '2<': 2.64,
        '3': 8.0,
        '3<': 6.4,
        '4': 12.5,
        '4<': 10.0
    },
    'T': {
        '1': 0.4,
        '1<': 0.32, 
        '2': 1.3, 
        '2<': 1.04,
        '3': 4.2, 
        '3<': 3.36, 
        '4': 9.5,
        '4<': 7.6
    },
    'S': {
        '1': 0.4, 
        '1<': 0.32, 
        '2': 1.3, 
        '2<': 1.04, 
        '3': 4.3, 
        '3<': 3.36, 
        '4': 9.7,
        '4<': 7.76
    },
    'Lo': {
        '1': 0.5, 
        '1<': 0.4, 
        '2': 1.7, 
        '2<': 1.36,
        '3': 4.9, 
        '3<': 3.92, 
        '4': 10.5,
        '4<': 8.4
    },
    'Eu': {
        '1': 0.5
    },
    'F': {
        '1': 0.5, 
        '1<': 0.4, 
        '1e': 0.4,
        '1<e': 0.3,
        '2': 1.8, 
        '2<': 1.44, 
        '2e': 1.44, 
        '2<e': 1.08, 
        '3': 5.3, 
        '3<': 4.24, 
        '3e': 4.24, 
        '3<e': 3.18, 
        '4': 11.0,
        '4<': 8.8,
        '4e': 8.8,
        '4<e': 6.6
    },
    'Lz': {
        '1': 0.6, 
        '1<': 0.48, 
        '1e': 0.48, 
        '1<e': 0.36, 
        '2': 2.1, 
        '2<': 1.68, 
        '2e': 1.68,
        '2<e': 1.26,  
        '3': 5.9, 
        '3<': 4.72, 
        '3e': 4.72, 
        '3<e': 3.54, 
        '4': 11.5,
        '4<': 9.2,
        '4e': 9.2,
        '4<e': 6.9
    },
    //Eu : [0.0, 0.5],
    'StSq': {
        'B': 1.5,
        '1': 1.8,
        '2': 2.6,
        '3': 3.3,
        '4': 3.9
    },
    'ChSq': {
        'B': 3.0
    },
    'USp': {
        'B': 1.0,
        '1': 1.2,
        '2': 1.5,
        '3': 1.9,
        '4': 2.4,
        'FB': 1.5,
        'F1': 1.7,
        'F2': 2.0,
        'F3': 2.4,
        'F4': 2.9,
        'FBV': 1.13,
        'F1V': 1.28,
        'F2V': 1.5,
        'F3V': 1.8,
        'F4V': 2.18,
        'CB': 1.5,
        'C1': 1.7,
        'C2': 2.0,
        'C3': 2.4,
        'C4': 2.9,
        'FCB': 1.5,
        'FC1': 1.7,
        'FC2': 2.0,
        'FC3': 2.4,
        'FC4': 2.9,
        'CBV': 1.13,
        'C1V': 1.28,
        'C2V': 1.5,
        'C3V': 1.8,
        'C4V': 2.18,
        'FCBV': 1.13,
        'FC1V': 1.28,
        'FC2V': 1.5,
        'FC3V': 1.8,
        'FC4V': 2.18
    },
    'LSp': {
        'B': 1.2,
        '1': 1.5,
        '2': 1.9,
        '3': 2.4,
        '4': 2.7,
        'FB': 1.7,
        'F1': 2.0,
        'F2': 2.4,
        'F3': 2.9,
        'F4': 3.2,
        'FBV': 1.28,
        'F1V': 1.5,
        'F2V': 1.8,
        'F3V': 2.18,
        'F4V': 2.4,
        'CB': 1.7,
        'C1': 2.0,
        'C2': 2.4,
        'C3': 2.9,
        'C4': 3.2,
        'FCB': 1.7,
        'FC1': 2.0,
        'FC2': 2.4,
        'FC3': 2.9,
        'FC4': 3.2,
        'FCBV': 1.28,
        'FC1V': 1.5,
        'FC2V': 1.8,
        'FC3V': 2.18,
        'FC4V': 2.4
    },
    'CSp': {
        'B': 1.1,
        '1': 1.4,
        '2': 1.8,
        '3': 2.3,
        '4': 2.6,
        'FB': 1.6,
        'F1': 1.9,
        'F2': 2.3,
        'F3': 2.8,
        'F4': 3.2,
        'FBV': 1.2,
        'F1V': 1.43,
        'F2V': 1.73,
        'F3V': 2.1,
        'F4V': 2.4,
        'CB': 1.7,
        'C1': 2.0,
        'C2': 2.3,
        'C3': 2.8,
        'C4': 3.2,
        'FCB': 1.7,
        'FC1': 2.0,
        'FC2': 2.3,
        'FC3': 2.8,
        'FC4': 3.2,
        'FCBV': 1.28,
        'FC1V': 1.5,
        'FC2V': 1.73,
        'FC3V': 2.1,
        'FC4V': 2.4
    },
    'SSp': {
        'B': 1.1,
        '1': 1.3,
        '2': 1.6,
        '3': 2.1,
        '4': 2.5,
        'FB': 1.7,
        'F1': 2.0,
        'F2': 2.3,
        'F3': 2.6,
        'F4': 3.0,
        'FBV': 1.28,
        'F1V': 1.5,
        'F2V': 1.73,
        'F3V': 1.95,
        'F4V': 2.25,
        'CB': 1.6,
        'C1': 1.9,
        'C2': 2.3,
        'C3': 2.6,
        'C4': 3.0,
        'FCB': 1.6,
        'FC1': 1.9,
        'FC2': 2.3,
        'FC3': 2.6,
        'FC4': 3.0,
        'FCBV': 1.2,
        'FC1V': 1.43,
        'FC2V': 1.73,
        'FC3V': 1.95,
        'FC4V': 2.25
    },
    'CoSp': {
        'B': 1.5,
        '1': 1.7,
        '2': 2.0,
        '3': 2.5,
        '4': 3.0,
        'FB': 1.5,
        'F1': 1.7,
        'F2': 2.0,
        'F3': 2.5,
        'F4': 3.0,
        'FBV': 1.13,
        'F1V': 1.28,
        'F2V': 1.5,
        'F3V': 1.88,
        'F4V': 2.25,
        'CB': 1.7,
        'C1': 2.0,
        'C2': 2.5,
        'C3': 3.0,
        'C4': 3.5,
        'FCB': 1.7,
        'FC1': 2.0,
        'FC2': 2.5,
        'FC3': 3.0,
        'FC4': 3.5,
        'FCBV': 1.28,
        'FC1V': 1.5,
        'FC2V': 1.88,
        'FC3V': 2.25,
        'FC4V': 2.63
    }
}