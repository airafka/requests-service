
export const formatPhoneMask = (
  inputValue: string, 
  country: 'ru' | 'us' | 'cn' = 'ru'
): string => {
  
  const prefixes = {
    ru: /^\+7\s*\(\s*/g,   
    us: /^\+1\s*\(?/g,     
    cn: /^\+86\s*/g         
  };
  
  let value = inputValue
    .replace(prefixes[country], '') 
    .replace(/\D/g, '')              
    .slice(0, { ru: 10, us: 10, cn: 11 }[country]);
    
  if (value.length === 0) return '';
  
  const configs = {
    ru: {
      code: '+7',
      groups: [
        { len: 3, start: ' (', end: ') ' },  
        { len: 6, start: '', end: '-' },  
        { len: 8, start: '', end: '-' }, 
        { len: 10, start: '', end: '' }   
      ]
    },
    us: {
      code: '+1',
      groups: [
        { len: 3, start: ' (', end: ') ' },
        { len: 6, start: '', end: '-' },
        { len: 10, start: '', end: '' }
      ]
    },
    cn: {
      code: '+86',
      groups: [
        { len: 3, start: ' ', end: ' ' },  
        { len: 7, start: '', end: ' ' }, 
        { len: 11, start: '', end: '' }
      ]
    }
  };
  
  const config = configs[country];
  
  if (value.length === 0) return '';
  
  let masked = '';

  switch(true) {
    case value.length === 0:
        masked = '';
        break
    case value.length <= config.groups[0].len: //
        masked = config.code + config.groups[0].start + value
        break
    case value.length <= config.groups[1].len: //
        masked = config.code + config.groups[0].start + value.slice(0, config.groups[0].len) + 
        config.groups[0].end + value.slice(config.groups[0].len)
        break
    case value.length <= config.groups[2].len:
       masked = config.code + config.groups[0].start + value.slice(0, config.groups[0].len) + 
       config.groups[0].end + value.slice(config.groups[0].len, config.groups[1].len) + 
       config.groups[1].end + value.slice(config.groups[1].len)
       break
    case config.groups[3].len && value.length <= config.groups[3].len:
        masked = config.code + config.groups[0].start + value.slice(0, config.groups[0].len) + 
       config.groups[0].end + value.slice(config.groups[0].len, config.groups[1].len) + 
       config.groups[1].end + value.slice(config.groups[1].len, config.groups[2].len) + 
       config.groups[2].end + value.slice(config.groups[2].len, config.groups[3].len)
  }

  return masked
};

