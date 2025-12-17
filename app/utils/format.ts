export type DateFormatVariant = 'short' | 'long';

export function formatDate(
    dateInput: Date | string | number,
    variant: DateFormatVariant = 'short',
): string {
    if (!dateInput) return '';

    const date = new Date(dateInput);

    if (Number.isNaN(date.getTime())) return '';

    const options: Intl.DateTimeFormatOptions =
        variant === 'long'
            ? {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
              }
            : { year: 'numeric', month: '2-digit', day: '2-digit' };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}
