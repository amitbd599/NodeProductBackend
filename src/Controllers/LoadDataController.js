const DataModel = require("../Models/DataModel");

exports.DataList = async (req, res) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = 6;
    let skipRow = (pageNo - 1) * perPage;

    let data = await DataModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $facet: {
          Total: [{ $count: "count" }],

          Row: [
            {
              $project: {
                title: 1,
                price: 1,
                description: 1,
                category: 1,
                image: 1,
              },
            },

            { $skip: skipRow },
            { $limit: perPage },
          ],
        },
      },
    ]);

    res.status(200).send(data);
    // res.status(200).json({ status: "Success", data: data });
  } catch (e) {
    res.status(200).json({ status: "Fail", error: e });
  }
};
