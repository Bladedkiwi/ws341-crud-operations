const Bunny = require('../models/Bunny');


async function getAllBunny (req,res) {
    const bunny = await Bunny.find();
    if (bunny) {
        res.status(200).send(bunny);
    }
}

async function getBunnyById (req,res) {
    const bunny = await Bunny.findById(req.params.id);
    res.status(200).send(bunny);
}

async function createBunny (req, res) {
    /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Create Bunny',
          schema: { $ref: #/definitions/Bunny}
          }
       */

    const bunny = new Bunny(req.body);
    await bunny.save();
    res.status(200).send(bunny);

}


async function updateBunny(req,res) {
    /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'Update Bunny',
          schema: { $ref: #/definitions/Bunny}
          }
       */

    // The {new: true} option sends back the newly create/updated document instead of the old version if there is one
    const bunny = await Bunny.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true} );
    if (!bunny) {
        res.status(404).send({message: "Bunny not found"});
    }

    res.status(200).send(bunny);
}

async function deleteBunny (req,res) {
    const bunny = await Bunny.findByIdAndDelete(req.params.id);
    if (!bunny) {
        return res.status(404).send({message: 'Bunny Not Found'});
    }
    res.status(200).send({message: 'Bunny Retired from Duty'});
}

module.exports = {getAllBunny, createBunny, getBunnyById, updateBunny, deleteBunny};