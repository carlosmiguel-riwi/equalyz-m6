export const TRM = 4120

export type CostLine = { label: string; value: number; note?: string }

export const faceoff = {
  product: 'Sony WH-1000XM5',
  imported: {
    store: 'Amazon USA',
    tag: 'Importado',
    url: 'amazon.com/dp/B09XS7JWHH',
    fobUsd: 248,
    total: 1_479_000,
    transit: '8–12 días hábiles',
    courier: 'Courier 4-72 Express',
    score: 79,
    warranty: 'Garantía en EE. UU.',
    returns: 'Devolución internacional',
    lines: [
      { label: 'Precio FOB', value: 1_021_760, note: 'USD 248.00 × TRM 4,120' },
      { label: 'Flete courier', value: 86_400, note: '2.1 lb · tarifa por libra' },
      { label: 'Arancel DIAN 10%', value: 110_816, note: 'Sobre CIF > USD 200' },
      { label: 'IVA 19%', value: 231_605, note: 'Base CIF + arancel' },
      { label: 'Seguro y gestión', value: 28_419 },
    ] as CostLine[],
  },
  local: {
    store: 'Éxito',
    tag: 'Distribuidor local',
    url: 'exito.com/audifonos-sony-wh1000xm5',
    total: 1_489_000,
    transit: '24 h',
    courier: 'Envío propio Bogotá',
    score: 94,
    warranty: '12 meses en Colombia',
    returns: '30 días en tienda',
    lines: [
      { label: 'Precio de lista', value: 1_251_261 },
      { label: 'IVA 19% incluido', value: 237_739 },
      { label: 'Envío', value: 0, note: 'Gratis > $150,000' },
      { label: 'Arancel', value: 0, note: 'No aplica' },
    ] as CostLine[],
  },
}

export const stores = ['Amazon USA', 'Mercado Libre', 'Éxito', 'AliExpress']
