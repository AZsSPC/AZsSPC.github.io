
export default class Receipt {
    static actions = Object.freeze(['put'])

    constructor() {
        this.queue = []
    }

    action_put(ingredient) {
        this.queue.push({ action: 'put', hash: ingredient.hash, amount: ingredient.amount })
    }

    check(inventory) {
        for (const q of this.queue.filter(e => e.action === 'put')) {
            const got = inventory.items[q.hash]?.amount
            console.log(`${got}/${q.amount} ${got >= q.amount ? '+' : '-'} ${AZ.locale.get(inventory.items[q.hash]?.title)} ${q.hash}`)
        }

    }
}
