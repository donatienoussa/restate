
export default function greeting() {
    const heure = new Date().getHours();
    return heure < 18 ? 'Bonjour' : 'Bonsoir';
}
