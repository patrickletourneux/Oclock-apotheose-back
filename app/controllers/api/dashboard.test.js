require('dotenv').config();
// const { object } = require('joi');
const dashboardController  = require('./dashboard');

// pour mock
// simule la réponse de la function findOneByPk du
// datamapper pour éviter d appeler la bdd durant les test
// si on change l'id, ça passe plus
// ça remplace la function quand elle est appelé par une des fonction testés
jest.mock('../../datamappers/user',() => {
  const originalModule = jest.requireActual('../../datamappers/user');
  return {
    ...originalModule,
    findOneByPk : jest.fn(()=> ({
      "id": 1,
      "email": "marie.curie@mail.fr",
      "pseudonym": "Marie",
      "avatar_img": null,
      "home_id": 1
    }))
  }
})


describe('dashboardController', () => {
  test('getNumberUsersinHome(user) home_id 1', async () => {
    const userCount = await dashboardController.getNumberUsersinHome({ home_id: 1 });
    // console.log(userCount);
    expect(userCount).toBe(2);
  });
  test('getNumberUsersinHome(user) home_id 1000', async () => {
    const userCount = await dashboardController.getNumberUsersinHome({ home_id: 1000 });
    // console.log(userCount);
    expect(userCount).toBe(0);
  });
  test('getUserFromBdd(req) req.params.id 1', async () => {
    const user = await dashboardController.getUserFromBdd({params : {id :1 }});
    expect(user.id).toBe(1);
  });
  test('findOneByPk(req, res) req.params.id 1', async () => {
    const dashboardData = await dashboardController.buildDashboardData({params : {id :1 }},{});
    expect(typeof dashboardData).toBe('object');
  });
});
