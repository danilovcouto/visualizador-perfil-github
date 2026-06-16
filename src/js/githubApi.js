const BASE_URL = 'https://api.github.com';

export async function fetchGithubUser(userName) {
    const response = await fetch(`${BASE_URL}/users/${userName}`, {
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

export async function fetchGithubUserRepos(userName) {
    const response = await fetch(`${BASE_URL}/users/${userName}/repos?per_page=10&sort=created`);
    if (!response.ok) {
        throw new Error('Repositorios não encontrados.');
    }
    return await response.json();
}