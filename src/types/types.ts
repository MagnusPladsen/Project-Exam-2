interface NavLink {
  name: string;
  path: string;
}

interface Customer {
  name: string;
  email: string;
  avatar: string;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  venueManager?: boolean;
  accessToken: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  venueManager: boolean;
}

interface ServerErrorResponse {
  errors: ServerError[];
  status: string;
  statusCode: number;
}

interface ServerError {
  code: string;
  message: string;
  path: string[];
}

interface Owner {
  name: string;
  email: string;
  avatar: string;
  bookings?: Booking[];
}

interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: Venue;
  customer?: Customer;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner: Owner;
}

interface CreateVenue {
  name: string;
  description: string;
  media?: string[];
  price: number;
  maxGuests: number;
  rating?: number;
  meta?: Meta;
  location?: Location;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
}
