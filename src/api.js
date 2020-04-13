export async function getSummaryStats() {
    const data = await fetch('https://api.covid19api.com/summary');
    return data.json();
}

export async function getDayOneDataByCountry(slug, status) {
    const data = await fetch(`https://api.covid19api.com/total/dayone/country/${slug}/status/${status}`);
    return data.json();
}