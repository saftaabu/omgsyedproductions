var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all products on the catalog
// ==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT product_id, productname, productimage, status, saleprice from product"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			res.render('error');
		}
	res.render('catalog/catalog', {products: result });
 	});
});

// ==================================================
// Route to add an item to the cart
// ==================================================
router.get('/:prodid/add', function(req, res, next) {
   cart.push(req.params.prodid);
   res.redirect('/catalog/cart');
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
	if (cart.length > 0) {
		let query = "SELECT product_id, productname, productimage, status, saleprice from product WHERE product_id in (" + cart + ")"; 
		// execute query
		db.query(query, (err, result) => {
			if (err) {
				res.render('error');
			}
			res.render('catalog/cart', {cartitems: result });
		});
	} else {
		res.render('catalog/cart');
	}
});

// ==================================================
// Route to remove an item to the cart
// ==================================================
router.get('/:itemid/remove', function(req, res, next) {
   cart.splice(req.params.itemid,1);
   res.redirect('/catalog/cart');
});


module.exports = router;



