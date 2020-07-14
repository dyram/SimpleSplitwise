const model = require("../models");
const Invite = model.Invite;

Invites = () => { };

Invites.addInvite = async (data) => {
    let promise
    data.inviteList.map(async obj => {
        promise = await Invite.create({ from: data.currId, ExpenseId: data.expenseId, to: obj.key, accept: false })
    })
    return promise
};

Invites.getInvite = async (uid, eid) => {
    let promise = await Invite.findAll({
        where: { from: uid, ExpenseId: eid }, include: [{
            model: model.Expenses,
            attributes: ["caegory", "amount"]
        },
        {
            model: model.Users,
            attributes: ["username", "email"]
        },]
    });
    return promise;
};


module.exports = Invites;
