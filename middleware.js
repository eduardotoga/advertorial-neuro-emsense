export default function middleware(request) {
  const country = request.headers.get('x-vercel-ip-country') || 'BR'
  const { pathname } = new URL(request.url)

  // Não redirecionar se já está em subpasta de idioma ou é um asset
  if (
    /^\/(en|es|fr|de)(\/|$)/.test(pathname) ||
    pathname.includes('.')
  ) {
    return
  }

  const ptCountries  = ['BR','PT','AO','MZ','CV','GW','ST','TL']
  const esCountries  = ['MX','CO','AR','ES','CL','PE','VE','EC','GT','BO','DO','HN','PY','SV','NI','CR','PA','UY','GQ','CU','PR']
  const frCountries  = ['FR','BE','LU','MC','SN','CI','CM','ML','BF','NE','TD','CG','GA','MG','DZ','MA','TN']
  const deCountries  = ['DE','AT','LI','CH']

  if (ptCountries.includes(country))  return                                                  // fica na raiz
  if (esCountries.includes(country))  return Response.redirect(new URL('/es', request.url), 302)
  if (frCountries.includes(country))  return Response.redirect(new URL('/fr', request.url), 302)
  if (deCountries.includes(country))  return Response.redirect(new URL('/de', request.url), 302)
  return Response.redirect(new URL('/en', request.url), 302)                                  // padrão: inglês
}

export const config = {
  matcher: ['/((?!en|es|fr|de|Imagens|imagens|_vercel|favicon).*)']
}
