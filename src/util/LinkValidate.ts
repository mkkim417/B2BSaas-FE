export function extractDomainWithoutTrailingSlash(url: any) {
  if (!url) {
    return null;
  }
  const regex =
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?((?:[^:\/\n?]+\.)+[^:\/\n?]+)(?::\d+)?(?:\/|$)/;
  const match = url.match(regex);
  if (!match) {
    return null;
  }
  let domain = match[1];
  if (domain.startsWith('www.')) {
    domain = domain.substr(4);
  } else if (domain.startsWith('ww.')) {
    domain = domain.replace('ww.', 'w.');
  }
  domain = domain.replace(/\/$/, '');
  if (domain.endsWith('.')) {
    domain = domain.substr(0, domain.length - 1);
  }
  if (domain.startsWith('http://')) {
    domain = domain.substr(7);
    if (domain.startsWith('//')) {
      domain = domain.substr(2);
    }
  }
  return domain || null;
}
