const Wrangler = require('../models/Wrangler');


async function getAllWranglers (req,res) {
        const wrangler = await Wrangler.find();
        if (wrangler) {
            res.status(200).send(wrangler);
        }
}

async function getWranglerById (req,res) {
        const wrangler = await Wrangler.findById(req.params.id);
        res.status(200).send(wrangler);
}

async function createWrangler (req, res) {
    const wrangler = new Wrangler(req.body);
        await wrangler.save();
        res.status(200).send(wrangler);

}

async function updateWrangler(req,res) {
        // The {new: true} option sends back the newly create/updated document instead of the old version if there is one
        const wrangler = await Wrangler.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true} );
        if (!wrangler) {
            res.status(404).send({message: "Wrangler not found"});
        }

        res.status(204).send('Wrangler has been updated');
}

async function deleteWrangler (req,res) {
        const wrangler = await Wrangler.findByIdAndDelete(req.params.id);
        if (!wrangler) {
            return res.status(404).send({message: 'Wrangler Not Found'});
        }
        res.status(204).send({message: 'Wrangler Retired from Duty'});
}

module.exports = {getAllWranglers, createWrangler, getWranglerById, updateWrangler, deleteWrangler};