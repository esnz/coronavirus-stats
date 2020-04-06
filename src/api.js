export async function getSummaryStats() {
    const data = await fetch('https://api.covid19api.com/summary');
    return data.json();
}