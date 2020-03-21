const BaseController = require('./BaseController');
const OrderService = require('../services/OrderService');

class OrderController extends BaseController {
  constructor() {
    super(OrderController);
  }

  async getAllUserOrders(req, res) {
    try {
      const orders = await OrderService.getUserOrders(req.query.id);

      return res.json({ orders });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getOrder(req, res) {
    try {
      const order = await OrderService.getOne(req.query.id);

      if (!order) return res.json({ failedMessage: 'Order not found' });

      return res.json({ order });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteUserOrder(req, res) {
    try {
      const { id, userId } = req.query;
      const updated = await OrderService.hideOne(id);

      if (updated.nModified === 0)
        return res.json({ failedMessage: 'Order not deleted' });

      const orders = await OrderService.getUserOrders(userId);

      return res.json({ successMessage: 'Order Deleted', orders });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAll();

      return res.json({ orders });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.query;

      if (!id) {
        return res.json({ failedMessage: 'Id not provided' });
      }

      const deleted = await OrderService.deleteOne(id);

      if (deleted.n === 0) {
        return res.json({ failedMessage: 'Order not deleted' });
      }

      const orders = await OrderService.getAll();

      return res.json({ successMessage: 'Order Deleted', orders });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const { id, value } = req.query;

      if (!id) {
        return res.json({ failedMessage: 'ID not provided' });
      } else if (!value) {
        return res.json({ failedMessage: 'Value not provided' });
      }

      const updated = await OrderService.updateOne(id, value);

      if (updated.nModified === 0) {
        return res.json({ failedMessage: 'Nothing updated' });
      }

      return res.json({ successMessage: 'Order Updated' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const OrderControllerInstance = new OrderController();

module.exports = OrderControllerInstance;
