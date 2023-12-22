import axios from 'axios';
import { KLAVIYO_API_KEY, KLAVIYO_LIST_ID } from 'src/config-global';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const data = {
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            custom_source: 'Pre Launch Newsletter',
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: 'SUBSCRIBED',
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: {
                type: 'list',
                id: KLAVIYO_LIST_ID,
              },
            },
          },
        },
      };

      const response = await axios.post(
        'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
        JSON.stringify(data),
        {
          headers: {
            accept: 'application/json',
            revision: '2023-12-15',
            'content-type': 'application/json',
            Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          },
        }
      );

      res.status(200).json({ message: 'Signed up for newsletter' });
    } catch (error) {
      console.error('Klaviyo API error:', error);
      res.status(500).json({ message: 'Newsletter signup failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
