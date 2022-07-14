require('dotenv').config();
const { object } = require('joi');
const dashboardController = require('./dashboard');

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
