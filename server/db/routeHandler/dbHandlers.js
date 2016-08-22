import {dbControllers} from '../controllers/dbControllers';
import Promise from 'bluebird';

const dbHandlers = {};

////////////////////////////////////////////////////////////////////////
/////// FOLLOWING ENDPOINTS ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
dbHandlers.addNewFollowing = (req, res) => {
  let userId = req.body.facebookId;
  let followsId = req.body.id;

  Promise.all([
    dbControllers.userGetOne(userId),
    dbControllers.userGetOne(followsId)
  ]).then((data) => {
    dbControllers.followsSetAdd(data[0], data[1]);
  }).then((following) => {
    res.send(following);
  }).catch((err) => {
    console.log('Error in adding a user following from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
dbHandlers.removeFollowing = (req, res) => {
  let userId = req.body.facebookId;
  let followsId = req.body.id;

  Promise.all([
    dbControllers.userGetOne(userId),
    dbControllers.userGetOne(followsId)
  ]).then((data) => {
    dbControllers.followsSetRemove(data[0], data[1]);
  }).then((follows) => {
    res.send(follows);
  }).catch((err) => {
    console.log('Error in removing a user follows from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
dbHandlers.getAllFollows = (req, res) => {
  let userId = req.body.facebookId;

  Promise.all([
    dbControllers.userGetOne(userId)
  ]).then((data) => {
    console.log('######## HAVE PROMISES???', typeof data[0]);
    dbControllers.followsGetAll(data[0]);
  }).then((followings) => {
    res.send(followings);
  }).catch((err) => {
    console.log('Error in getting a user follows from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
///////// PRODUCT ENDPOINTS ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
dbHandlers.addNewProduct = (req, res) => {
  Promise.all([
    dbControllers.productSetAdd(req.body)
  ]).then((product) => {
    res.send(product);
  }).catch((err) => {
    console.log('Error in getting user products from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
dbHandlers.addProductComment = (req, res) => {
  let facebookId = req.body.facebookId;
  let product = req.body.upc;
  let comment = req.body.comment;

  Promise.all([
    dbControllers.userGetOne(facebookId),
    dbControllers.productGetOne(product)
  ]).then((userProd) => {
    dbControllers.productSetCommRate(userProd[1], userProd[0], comment);
  }).then((setProduct) => {
    res.send(setProduct);
  }).catch((err) => {
    console.log('Error in adding product comment from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
dbHandlers.getAllUsersProducts = (req, res) => {
  let facebookId = req.body.facebookId;

  Promise.all([
    dbControllers.userGetOne(facebookId)
  ]).then((foundUser) => {
    getAllUsersProducts(foundUser[0]);
  }).then((products) => {
    res.send(products);
  }).catch((err) => {
    console.log('Error in getting user products from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
////////// USER ENDPOINTS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
dbHandlers.addNewUser = (req, res) => {
  console.log('postman connects');
  Promise.all([
    dbControllers.userSetNew(req)
  ]).then((newUser) => {
    res.send(newUser[0]);
  }).catch((err) => {
    console.log('Error in adding a new user from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
dbHandlers.updateUser = (req, res) => {
  Promise.all([
    dbControllers.userSetUpdate(req.body)
  ]).then((updatedUser) => {
    res.send(updatedUser[0]);
  }).catch((err) => {
    console.log('Error in updating a user from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
dbHandlers.confirmUser = (req, res) => {
  let facebookId = req.body.data.facebookId;

  Promise.all([
    dbControllers.userGetOne(facebookId)
  ]).then((userFound) => {
    res.send(userFound[0]);
  }).catch((err) => {
    console.log('Error in finding a user from handler');
    res.send(err);
  });
};

////////////////////////////////////////////////////////////////////////
////////////// EXPORTS /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
export default dbHandlers;
