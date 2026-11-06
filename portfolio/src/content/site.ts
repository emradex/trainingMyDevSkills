export const profile = {
  name: 'Mauro Radesca', location: 'Montevideo, UY',
  email: 'mauroradesca1a@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mauro-radesca-9957191b4/',
  github: 'https://github.com/emradex',
  resume: { path: 'cv/Mauro_Radesca_CV_IT_Publico.pdf', downloadName: 'Mauro_Radesca_CV_IT.pdf', language: 'es' },
} as const;

// All locally hosted public resources work at the root or a deployment subpath.
export function assetUrl(path: string) { return `${import.meta.env.BASE_URL}${path}`; }
