import { format as dateFNsFormat, parseJSON } from 'date-fns';
import { de } from 'date-fns/locale';

export const formatDate = (date: string, format?: string) => dateFNsFormat(parseJSON(date), format || 'P', { locale: de })
