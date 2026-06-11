const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const profileResults = document.querySelector('.profile-results');

const BASE_URL = 'https://api.github.com';

btnSearch.addEventListener('click', async () => {
    const userName = inputSearch.value;

    if (userName) {
        profileResults.innerHTML = `<p class="loading">Carregando...</p>`;

        try {
            //Aqui você pode adicionar a lógica para usar o valor do input
            const response = await fetch(`${BASE_URL}/users/${userName}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'X-GitHub-Api-Version': '2026-03-10'
                }
            });

            if (!response.ok) {
                alert('Usuário não encontrado. Por favor, verifique o nome de usuário no GitHub e tente novamente.');
                profileResults.innerHTML = "";
                return;
            }

            const userData = await response.json();
            console.log(userData);

            profileResults.innerHTML = `
            <div class="profile-card">
                <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
                <div class="profile-info">
                    <h2>${userData.name}</h2>
                    <p>${userData.bio || 'Não possui bio cadastrada 😢.'}</p> 
                </div>
            </div>
            
            <div class="profile-counters">
                <div class="followers">
                    <h4>Seguidores</h4>
                    <span>${userData.followers}</span>
                </div>
                <div class="following">
                    <h4>Seguindo</h4>
                    <span>${userData.following}</span>
                </div>
            </div>
            `;

        } catch (error) {
            console.error('Erro  ao buscar o perfil do usuário:', error);
            alert('Ocorreu um erro ao buscar o perfil do usuário. Por favor, tente novamente mais tarde.');
            profileResults.innerHTML = "";
        }

        // console.log(data.avatar_url);
        // console.log(data.name);
        // console.log(data.bio);
        // console.log(data.followers);
        // console.log(data.following);

    } else {
        alert('Por favor, digite um nome de usuário no GitHub. ');
        profileResults.innerHTML = "";
    }
});