export async function fetchGithubUser(username) {
    const BASE_URL = 'https://api.github.com';
    const response = await fetch(`${BASE_URL}/users/${username}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2026-03-10'
        }
    });
    if (!response.ok) {
        throw new Error('Usuário nao encontrado.');
    }
    return await response.json();
}