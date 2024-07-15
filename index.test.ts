import { InterfaceToType } from "./index";

type IsEqual<Left, Right> = Left extends Right
  ? Right extends Left
    ? true
    : false
  : false;

type IsSubtype<Left, Right> = Left extends Right ? true : false;

const expectEqual = <Left, Right, Outcome extends IsEqual<Left, Right>>() => {};

const expectSubtype = <
  Left,
  Right,
  Outcome extends IsSubtype<Left, Right>,
>() => {};

// InterfaceToType
{
  // It works with optional properties
  {
    interface Interface {
      a: string;
      b?: boolean;
    }

    type Converted = InterfaceToType<Interface>;

    expectEqual<Interface, Converted, true>();
  }

  // It works with extensions
  {
    interface Base {
      a: string;
    }

    interface Derived extends Base {
      b: number;
    }

    type Converted = InterfaceToType<Derived>;

    expectEqual<Derived, Converted, true>;
  }

  // Converted is assignable to Record<string, unknown>
  {
    interface Interface {}

    type Converted = InterfaceToType<Interface>;

    expectSubtype<Interface, Record<string, unknown>, false>();
    expectSubtype<Converted, Record<string, unknown>, true>();
  }
}
