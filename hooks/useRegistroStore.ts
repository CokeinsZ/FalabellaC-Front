import { create } from 'zustand';

interface RegistroData {
  tipoPersona?: {
    tipoPersona: "natural" | "juridica" | "";
  };
  personas?: any;
  empresa?: any;
  direcciones?: any;
  declaraciones?: any;
}

interface AcordeonesCompletos {
  personas: boolean;
  empresa: boolean;
}

interface RegistroState {
  pasoActual: number;
  datos: RegistroData;
  acordeonesCompletos: AcordeonesCompletos;
  setPaso: (paso: number) => void;
  actualizarDatos: (seccion: string, values: any) => void;
  marcarAcordeonCompleto: (seccion: keyof AcordeonesCompletos, completado: boolean) => void;
  puedeContinuar: () => boolean;
  reset: () => void;
}

export const useRegistroStore = create<RegistroState>((set, get) => ({
  pasoActual: 1,
  datos: {
    tipoPersona: { tipoPersona: "" },
    personas: {},
    empresa: {}
  },
  acordeonesCompletos: {
    personas: false,
    empresa: false
  },
  
  setPaso: (paso: number) => set({ pasoActual: paso }),
  
  actualizarDatos: (seccion: string, values: any) => 
    set((state) => ({
      datos: {
        ...state.datos,
        [seccion]: values
      }
    })),
    
  marcarAcordeonCompleto: (seccion: keyof AcordeonesCompletos, completado: boolean) =>
    set((state) => ({
      acordeonesCompletos: {
        ...state.acordeonesCompletos,
        [seccion]: completado
      }
    })),
    
  puedeContinuar: () => {
    const { acordeonesCompletos, pasoActual } = get();
    const secciones: (keyof AcordeonesCompletos)[] = ['personas', 'empresa'];
    const seccionActual = secciones[pasoActual - 1];
    return seccionActual ? acordeonesCompletos[seccionActual] : false;
  },
  
  reset: () => set({
    pasoActual: 1,
    datos: {
      tipoPersona: { tipoPersona: "" },
      personas: {},
      empresa: {}
    },
    acordeonesCompletos: {
      personas: false,
      empresa: false
    }
  })
}));