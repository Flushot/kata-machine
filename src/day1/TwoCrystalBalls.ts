export default function two_crystal_balls(breaks: boolean[]): number {
    const chunkSize = Math.floor(Math.sqrt(breaks.length));
    const chunkCount = Math.floor(breaks.length / chunkSize);

    for (let chunkIdx = 0; chunkIdx < chunkCount; ++chunkIdx) {
        const chunkPtr = chunkIdx * chunkSize;
        const chunk = breaks.slice(chunkPtr, chunkPtr + chunkSize);
        if (!chunk[chunk.length - 1]) {
            continue;
        }

        // Backtrack into chunk to find first match
        for (let slotIdx = 0; slotIdx < chunk.length; ++slotIdx) {
            if (chunk[slotIdx]) {
                return chunkPtr + slotIdx;
            }
        }
    }

    return -1;
}
