export default function animalsRoutes(router) {
    const animalsContoller = require('../controllers/animalsContoller');
    router.get('/animals', animalsContoller.list_animals);
    router.get('/animal/:id', animalsContoller.one_animal);
    router.post('/animal', animalsContoller.add_animal);
    router.put('/animal/:id', animalsContoller.update_animal);
    router.delete('/animal/:id', animalsContoller.delete_animal);
};