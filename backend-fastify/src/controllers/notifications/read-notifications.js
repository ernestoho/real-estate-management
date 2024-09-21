import { User } from "../../models/user.js";
import { removeExpiredNotifications } from "../../services/notification.js";
import { authBearerToken } from "../../utils/requests.js";
import { userIdToken } from "../../utils/users.js";

/**
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export const readNotification = async function (req, res) {
  const token = authBearerToken(req);
  const user_id = userIdToken(token);
  const param_id = req.body.id;

  try {
    const user = await User.findOne({ user_id }).select("notifications");
    if (!user) {
      return res.status(404).send({ message: "Error: User not found." });
    }
    if (!user.notifications.length) {
      return res.status(404).send({});
    }
    removeExpiredNotifications(user);

    const ids = Array.isArray(param_id) ? param_id : [param_id];
    const updatedNotifications = [];
    ids.forEach((id) => {
      const notification = user.notifications.find(
        (item) => item.notification_id === id && !item.read
      );
      if (notification) {
        notification.read = true;
        updatedNotifications.push(notification);
      }
    });
    if(updatedNotifications.length) {
      await user.save();
    }
    res.status(200).send({
      status: 200,
      message: "Success: Notification has been set to read!",
      data: updatedNotifications,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error: Something went wrong please try again later." });
  }
};
