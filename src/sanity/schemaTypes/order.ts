import {defineField, defineType} from 'sanity'

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'text',
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount (CHF)',
      type: 'number',
    }),
    defineField({
      name: 'stripeSessionId',
      title: 'Stripe Session ID',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'Paid', value: 'paid'},
          {title: 'Shipped', value: 'shipped'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'paid',
    }),
    defineField({
      name: 'items',
      title: 'Line Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'productName', type: 'string', title: 'Product Name'},
            {name: 'size', type: 'string', title: 'Size'},
            {name: 'quantity', type: 'number', title: 'Quantity'},
            {name: 'price', type: 'number', title: 'Price (CHF)'},
          ],
        },
      ],
    }),
  ],
})
