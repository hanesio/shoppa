interface ColorObject {
  text: string
  bg: string
  border: string
  hover: string
}

export const colorMap = new Map<string, ColorObject>([
  [
    'Obst & Gemüse',
    {
      text: 'text-lime-800',
      bg: 'bg-lime-100',
      border: 'border-lime-400',
      hover: 'hover:bg-lime-300',
    },
  ],
  [
    'Fleisch & Wurst',
    {
      text: 'text-pink-800',
      bg: 'bg-pink-100',
      border: 'border-pink-400',
      hover: 'hover:bg-pink-300',
    },
  ],
  [
    'Milchprodukte',
    {
      text: 'text-blue-800',
      bg: 'bg-blue-100',
      border: 'border-blue-400',
      hover: 'hover:bg-blue-300',
    },
  ],
  [
    'Getränke',
    {
      text: 'text-purple-800',
      bg: 'bg-purple-100',
      border: 'border-purple-400',
      hover: 'hover:bg-purple-300',
    },
  ],
  [
    'Haushalt',
    {
      text: 'text-stone-800',
      bg: 'bg-stone-100',
      border: 'border-stone-400',
      hover: 'hover:bg-stone-300',
    },
  ],
  [
    'Getreideprodukte',
    {
      text: 'text-yellow-800',
      bg: 'bg-yellow-100',
      border: 'border-yellow-400',
      hover: 'hover:bg-yellow-300',
    },
  ],
  [
    'Sonstiges',
    {
      text: 'text-gray-800',
      bg: 'bg-gray-100',
      border: 'border-gray-400',
      hover: 'hover:bg-gray-300',
    },
  ],
])
