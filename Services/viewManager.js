
/**
 * @param {String} cID This is the customers reference Id
 * @param {boolean} approved This is the Authorixed to purchase boolean 
 */
function displayAllOrdsByCustoRef(cID, approved) {
    return new Promise(function (resolve, reject) {
        Order.find({ custoRef: cID }).then(function (orderOrListOf) {
            var count = 0;
            orderOrListOf.forEach(function (element) {
                count++;

            }, this);

            if (count > 0) {
                resolve(orderOrListOf);
            } else {
                reject('No Orders found with that Customer Reference');
            }

        }).catch(function (err) {
            reject('error occured displaying customer orders by custoRef. check customerId');
        });
    })
}

function displayNewOrder(newOrderRef) {
    return new Promise(function (resolve, reject) {
        Order.findOne({ orderRef: newOrderRef }).then(function (newlyCreatedOrder) {
            resolve(newlyCreatedOrder);

        }).catch(function (err) {
            reject('error occured. check customerId or Params. customer authorisation not updated');
        });
    })
}

module.exports = { displayAllOrdsByCustoRef, displayNewOrder };
