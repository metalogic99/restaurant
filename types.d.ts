interface Table {
  _id: string;
  tableName: string;
  status: "available" | "occupied";
  duration: string;
  activeOrderId: string;
}

interface Category {
  _id: string;
  name: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  _id: string;
  name: string;
  products: Product[];
  parentCategory: {
    _id: string;
    name: string;
  };
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  subcategory: {
    _id: string;
    name: string;
  };
}

interface User {
  _id: string;
  fullName: string;
  userName: string;
  password: string;
  role: "waiter" | "chef" | "receptionist";
  createdAt: string;
}

interface AddOrder {
  productId: string;
  quantity: number;
  notes: string;
}

interface UpdateOrder {
  productId?: string;
  quantity?: number;
  notes?: string;
  status?: string;
}

interface UpdateTable {
  status?: string;
  name?: string;
}

interface Order {
  _id: string;
  orderType: string;
  tableId: string;
  grossTotal: number;
  total: number;
  discount: number;
  orderedProducts: {
    product: Product;
    quantity: number;
    notes: string;
    status: string;
    _id: string;
  }[];
  cancelledOrders: {
    product: Product;
    quantity: number;
  }[];
  status: string;
  createdAt: string;
}

interface SalesFiltering {
  orderType?: string;
  status?: string;
  time?: string;
  to?: string;
  from?: string;
  page: number;
}

interface LocalOrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  notes?: string;
}

interface OrderedProduct {
  product: Product;
  quantity: number;
  notes: string;
  status: string;
}

interface Login {
  email: string;
  password: string;
  role: "chef" | "admin" | "receptionist" | "waiter";
}

interface Payload {
  username: string;
  role: string;
}

interface Special {
  _id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  publicId: string;
}

interface Expense {
  _id: string;
  name: string;
  amount: number;
  date: Date;
  createdAt: Date;
}
