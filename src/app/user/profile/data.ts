export interface IPEState {
  code: string
  name: string
}

export function USStateFilter(value: string): IPEState[] {
  return PEStates.filter((state) => {
    return (
      (state.code.length === 2 && state.code.toLowerCase() === value.toLowerCase()) ||
      state.name.toLowerCase().indexOf(value.toLowerCase()) === 0
    )
  })
}

const PEStates = [
  { code: 'AM', name: 'Amazonas' },
  { code: 'AN', name: 'Áncash' },
  { code: 'AP', name: 'Apurímac' },
  { code: 'AR', name: 'Arequipa' },
  { code: 'AY', name: 'Ayacucho' },
  { code: 'CA', name: 'Cajamarca' },
  { code: 'Cl', name: 'Callao' },
  { code: 'CU', name: 'Cusco' },
  { code: 'HU', name: 'Huancavelica' },
  { code: 'HV', name: 'Huánuco' },
  { code: 'IC', name: 'Ica' },
  { code: 'JU', name: 'Junín' },
  { code: 'LL', name: 'La Libertad' },
  { code: 'LA', name: 'Lambayeque' },
  { code: 'LI', name: 'Lima' },
  { code: 'LO', name: 'Loreto' },
  { code: 'MD', name: 'Madre de Dios' },
  { code: 'MO', name: 'Moquegua' },
  { code: 'PA', name: 'Pasco' },
  { code: 'PI', name: 'Piura' },
  { code: 'PU', name: 'Puno' },
  { code: 'SM', name: 'San Martín' },
  { code: 'TA', name: 'Tacna' },
  { code: 'TU', name: 'Tumbes' },
  { code: 'UC', name: 'Ucayali' },
]


