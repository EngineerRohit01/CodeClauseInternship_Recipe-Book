document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const recipesContainer = document.getElementById('recipesContainer');

    // Load recipes from local storage
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Function to render recipes
    function renderRecipes() {
        recipesContainer.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            recipeCard.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p>${recipe.ingredients}</p>
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            `;

            recipesContainer.appendChild(recipeCard);
        });
    }

    // Function to add a recipe
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newRecipe = {
            title: recipeForm.title.value,
            image: recipeForm.image.value,
            ingredients: recipeForm.ingredients.value
        };

        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();

        recipeForm.reset();
    });

    // Function to delete a recipe
    window.deleteRecipe = (index) => {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
    };

    // Function to edit a recipe
    window.editRecipe = (index) => {
        const recipe = recipes[index];
        recipeForm.title.value = recipe.title;
        recipeForm.image.value = recipe.image;
        recipeForm.ingredients.value = recipe.ingredients;

        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
    };

    // Initial render
    renderRecipes();
});
