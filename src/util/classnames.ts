export function createBlock(block: string, element: string, ...modifiers: string[]): string {
    const base = block + (element ? `__${element}` : '');

    return [
        base,
        ...modifiers.map(modifier => `${base}_${modifier}`)
    ].join(' ');
}