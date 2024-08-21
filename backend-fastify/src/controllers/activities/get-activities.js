import { Activity } from "../../models/activity.js";
import { authBearerToken } from "../../utils/requests.js";
import { userIdToken } from "../../utils/users.js";

/**
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
export const getActivities = async function (req, res) {
  const token = authBearerToken(req);
  const id = userIdToken(token);
  const activities = await Activity.find({ user_id: id });

  res.status(200).send({
    status: 200,
    message: "Returns list of activities",
    data: activities
  });
};
