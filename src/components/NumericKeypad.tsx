import { Delete } from 'lucide-react';
import { Button } from './ui/button';

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
}

export function NumericKeypad({ value, onChange }: NumericKeypadProps) {
  const handleNumberClick = (num: string) => {
    // Prevent multiple decimal points
    if (num === '.' && value.includes('.')) return;
    
    // Prevent starting with decimal point
    if (num === '.' && value === '') {
      onChange('0.');
      return;
    }
    
    onChange(value + num);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const formatDisplayValue = (val: string): string => {
    if (!val) return '0.00';
    
    // If there's a decimal point, preserve it as typed
    if (val.includes('.')) {
      return val;
    }
    
    // Otherwise show as whole number
    return val;
  };

  const keys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', 'backspace'],
  ];

  return (
    <div className="space-y-4">
      {/* Display */}
      <div className="rounded-lg border-2 border-border bg-muted/30 p-4">
        <div className="text-right">
          <div className="text-muted-foreground">Amount</div>
          <div className="mt-1 flex items-baseline justify-end gap-1">
            <span className="text-muted-foreground">₱</span>
            <span className="min-h-[2rem] text-[2rem] tabular-nums">
              {formatDisplayValue(value)}
            </span>
          </div>
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-2">
        {keys.map((row, rowIndex) =>
          row.map((key, keyIndex) => {
            if (key === 'backspace') {
              return (
                <Button
                  key={`${rowIndex}-${keyIndex}`}
                  type="button"
                  variant="outline"
                  onClick={handleBackspace}
                  className="h-14 bg-destructive/10 text-destructive hover:bg-destructive/20"
                >
                  <Delete className="h-5 w-5" />
                </Button>
              );
            }

            return (
              <Button
                key={`${rowIndex}-${keyIndex}`}
                type="button"
                variant="outline"
                onClick={() => handleNumberClick(key)}
                className="h-14"
              >
                {key}
              </Button>
            );
          })
        )}
      </div>

      {/* Clear button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleClear}
        className="w-full"
      >
        Clear
      </Button>
    </div>
  );
}
