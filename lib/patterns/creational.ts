import { Pattern } from "@/types/pattern";

export const singletonPattern: Pattern = {
  id: "singleton",
  name: "Singleton",
  category: "creational",
  description:
    "Ensures a class has only one instance and provides a global point of access to it.",
  intent:
    "The Singleton pattern ensures that a class has only one instance throughout the application lifecycle and provides a global access point to that instance.",
  motivation:
    "Some classes should have exactly one instance. For example, a configuration manager, a connection pool, or a logging service. The Singleton pattern provides a way to ensure that only one instance of such classes exists and provides a global access point to it.",
  structure:
    "The Singleton class declares a static method getInstance() that returns the same instance of its own class. The Singleton's constructor is made private to prevent direct construction calls with the new operator.",
  participants: [
    "Singleton - declares a static getInstance() method that returns the unique instance",
    "Client - accesses the Singleton instance through the getInstance() method",
  ],
  collaboration:
    "Clients access the Singleton instance exclusively through the Singleton's getInstance() method.",
  consequences: {
    pros: [
      "Controlled access to the sole instance",
      "Reduced namespace pollution",
      "Permits refinement of operations and representation",
      "Lazy initialization is possible",
    ],
    cons: [
      "Difficult to test due to global state",
      "Violates Single Responsibility Principle",
      "Can mask bad design",
      "Requires special treatment in multithreaded environment",
    ],
  },
  implementation: {
    considerations: [
      "Ensure thread safety in concurrent environments",
      "Consider lazy vs eager initialization",
      "Be careful with serialization/deserialization",
      "Watch out for reflection attacks",
    ],
    tips: [
      "Use private constructor to prevent instantiation",
      "Store the instance in a private static field",
      "Provide a public static method to get the instance",
      "Consider using modules for singleton behavior in modern JavaScript/TypeScript",
    ],
  },
  useCases: [
    "Configuration management",
    "Connection pooling",
    "Logging services",
    "Cache management",
    "Thread pools",
    "Device drivers",
  ],
  relatedPatterns: [
    "factory-method",
    "abstract-factory",
    "prototype",
  ],
  example: {
    title: "Database Connection Singleton",
    description:
      "A singleton class that manages a single database connection throughout the application.",
    code: `class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean = false;

  private constructor() {
    console.log('Initializing database connection...');
    this.connected = true;
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string): string {
    if (!this.connected) {
      throw new Error('Not connected to database');
    }
    return \`Executing query: \${sql}\`;
  }

  public isConnected(): boolean {
    return this.connected;
  }
}

// Usage
const db1 = DatabaseConnection.getInstance();
console.log(db1.query('SELECT * FROM users'));

const db2 = DatabaseConnection.getInstance();
console.log('Same instance?', db1 === db2); // true
console.log('Connection status:', db2.isConnected());`,
  },
  code: `class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean = false;

  private constructor() {
    console.log('Initializing database connection...');
    this.connected = true;
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string): string {
    if (!this.connected) {
      throw new Error('Not connected to database');
    }
    return \`Executing query: \${sql}\`;
  }

  public isConnected(): boolean {
    return this.connected;
  }
}

// Usage
const db1 = DatabaseConnection.getInstance();
console.log(db1.query('SELECT * FROM users'));

const db2 = DatabaseConnection.getInstance();
console.log('Same instance?', db1 === db2);
console.log('Connection status:', db2.isConnected());`,
};

export const factoryMethodPattern: Pattern = {
  id: "factory-method",
  name: "Factory Method",
  category: "creational",
  description:
    "Defines an interface for creating objects, but lets subclasses decide which class to instantiate.",
  intent:
    "The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. It lets a class defer instantiation to subclasses.",
  motivation:
    "When a class cannot anticipate the type of objects it needs to create, or when a class wants its subclasses to specify the objects it creates, the Factory Method pattern is useful. It promotes loose coupling by eliminating the need to bind application-specific classes into the code.",
  structure:
    "The pattern involves a Creator class that declares the factory method, which returns an object of type Product. ConcreteCreator classes override the factory method to return an instance of a ConcreteProduct.",
  participants: [
    "Product - defines the interface of objects the factory method creates",
    "ConcreteProduct - implements the Product interface",
    "Creator - declares the factory method",
    "ConcreteCreator - overrides the factory method to return a ConcreteProduct",
  ],
  collaboration:
    "The Creator relies on its subclasses to define the factory method so that it returns an instance of the appropriate ConcreteProduct.",
  consequences: {
    pros: [
      "Eliminates the need to bind application-specific classes into the code",
      "Provides hooks for subclasses",
      "Connects parallel class hierarchies",
      "Follows Open/Closed Principle",
    ],
    cons: [
      "Can lead to a large number of subclasses",
      "Clients might need to subclass the Creator class just to create a particular ConcreteProduct",
    ],
  },
  implementation: {
    considerations: [
      "Decide if the Creator class should provide a default implementation",
      "Consider using parameters to specify the kind of product to create",
      "Think about naming conventions for factory methods",
    ],
    tips: [
      "Use descriptive names for factory methods like createProduct()",
      "Consider making the factory method abstract to force subclasses to override it",
      "Document what kind of objects the factory method creates",
    ],
  },
  useCases: [
    "GUI frameworks with different look-and-feel standards",
    "Document editors with different document types",
    "Data access layers with different database providers",
    "Logistics applications with different transport methods",
  ],
  relatedPatterns: [
    "abstract-factory",
    "prototype",
    "singleton",
  ],
  example: {
    title: "Transport Logistics",
    description:
      "A logistics application that uses different transport methods (Truck, Ship) based on the delivery type.",
    code: `interface Transport {
  deliver(): string;
}

class Truck implements Transport {
  deliver(): string {
    return 'Delivering by truck on land';
  }
}

class Ship implements Transport {
  deliver(): string {
    return 'Delivering by ship on sea';
  }
}

abstract class Logistics {
  abstract createTransport(): Transport;

  planDelivery(): string {
    const transport = this.createTransport();
    return transport.deliver();
  }
}

class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}

// Usage
const roadLogistics = new RoadLogistics();
console.log(roadLogistics.planDelivery());

const seaLogistics = new SeaLogistics();
console.log(seaLogistics.planDelivery());`,
  },
  code: `interface Transport {
  deliver(): string;
}

class Truck implements Transport {
  deliver(): string {
    return 'Delivering by truck on land';
  }
}

class Ship implements Transport {
  deliver(): string {
    return 'Delivering by ship on sea';
  }
}

abstract class Logistics {
  abstract createTransport(): Transport;

  planDelivery(): string {
    const transport = this.createTransport();
    return transport.deliver();
  }
}

class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}

// Usage
const roadLogistics = new RoadLogistics();
console.log(roadLogistics.planDelivery());

const seaLogistics = new SeaLogistics();
console.log(seaLogistics.planDelivery());`,
};

export const builderPattern: Pattern = {
  id: "builder",
  name: "Builder",
  category: "creational",
  description:
    "Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.",
  intent:
    "The Builder pattern separates the construction of a complex object from its representation so that the same construction process can create different representations.",
  motivation:
    "When creating a complex object requires many steps, the Builder pattern lets you construct objects step by step. It's useful when an object needs to be created with many possible configurations.",
  structure:
    "The pattern involves a Builder interface that specifies methods for creating parts of a Product object. ConcreteBuilder classes implement the Builder interface. A Director class constructs an object using the Builder interface.",
  participants: [
    "Builder - specifies an abstract interface for creating parts of a Product object",
    "ConcreteBuilder - constructs and assembles parts of the product",
    "Director - constructs an object using the Builder interface",
    "Product - represents the complex object under construction",
  ],
  collaboration:
    "The client creates the Director object and configures it with the desired Builder object. Director notifies the builder whenever a part of the product should be built. Builder handles requests from the director and adds parts to the product.",
  consequences: {
    pros: [
      "Allows you to vary a product's internal representation",
      "Isolates code for construction and representation",
      "Gives finer control over the construction process",
      "Follows Single Responsibility Principle",
    ],
    cons: [
      "Increases overall code complexity",
      "Requires creating multiple new classes",
    ],
  },
  implementation: {
    considerations: [
      "Define a clear interface for building parts",
      "Decide whether Director is necessary",
      "Consider fluent interface for builder methods",
    ],
    tips: [
      "Use method chaining for a fluent API",
      "Make the builder return itself from setter methods",
      "Consider providing default values",
      "Make the build() method return the final product",
    ],
  },
  useCases: [
    "Creating complex DOM structures",
    "Building SQL queries",
    "Constructing meals in restaurants",
    "Assembling vehicles with different options",
    "Creating HTTP requests",
  ],
  relatedPatterns: ["abstract-factory", "composite"],
  example: {
    title: "Computer Builder",
    description:
      "A builder for creating computers with different configurations.",
    code: `class Computer {
  constructor(
    public cpu: string,
    public ram: string,
    public storage: string,
    public gpu?: string
  ) {}

  display(): string {
    let specs = \`Computer: \${this.cpu}, \${this.ram} RAM, \${this.storage} Storage\`;
    if (this.gpu) {
      specs += \`, \${this.gpu} GPU\`;
    }
    return specs;
  }
}

class ComputerBuilder {
  private cpu: string = '';
  private ram: string = '';
  private storage: string = '';
  private gpu?: string;

  setCPU(cpu: string): ComputerBuilder {
    this.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.gpu = gpu;
    return this;
  }

  build(): Computer {
    return new Computer(this.cpu, this.ram, this.storage, this.gpu);
  }
}

// Usage
const gamingPC = new ComputerBuilder()
  .setCPU('Intel i9')
  .setRAM('32GB')
  .setStorage('1TB SSD')
  .setGPU('RTX 4090')
  .build();

console.log(gamingPC.display());

const officePC = new ComputerBuilder()
  .setCPU('Intel i5')
  .setRAM('16GB')
  .setStorage('512GB SSD')
  .build();

console.log(officePC.display());`,
  },
  code: `class Computer {
  constructor(
    public cpu: string,
    public ram: string,
    public storage: string,
    public gpu?: string
  ) {}

  display(): string {
    let specs = \`Computer: \${this.cpu}, \${this.ram} RAM, \${this.storage} Storage\`;
    if (this.gpu) {
      specs += \`, \${this.gpu} GPU\`;
    }
    return specs;
  }
}

class ComputerBuilder {
  private cpu: string = '';
  private ram: string = '';
  private storage: string = '';
  private gpu?: string;

  setCPU(cpu: string): ComputerBuilder {
    this.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.gpu = gpu;
    return this;
  }

  build(): Computer {
    return new Computer(this.cpu, this.ram, this.storage, this.gpu);
  }
}

// Usage
const gamingPC = new ComputerBuilder()
  .setCPU('Intel i9')
  .setRAM('32GB')
  .setStorage('1TB SSD')
  .setGPU('RTX 4090')
  .build();

console.log(gamingPC.display());

const officePC = new ComputerBuilder()
  .setCPU('Intel i5')
  .setRAM('16GB')
  .setStorage('512GB SSD')
  .build();

console.log(officePC.display());`,
};

export const abstractFactoryPattern: Pattern = {
  id: "abstract-factory",
  name: "Abstract Factory",
  category: "creational",
  description:
    "Provides an interface for creating families of related or dependent objects without specifying their concrete classes.",
  intent:
    "The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.",
  motivation:
    "When your code needs to work with various families of related products, but you don't want it to depend on the concrete classes of those products, Abstract Factory is useful. It's particularly helpful for ensuring that products from the same family are used together.",
  structure:
    "The pattern declares interfaces for creating each distinct product. Concrete factory classes implement these creation methods. Each concrete factory corresponds to a specific variant of products.",
  participants: [
    "AbstractFactory - declares an interface for operations that create abstract product objects",
    "ConcreteFactory - implements the operations to create concrete product objects",
    "AbstractProduct - declares an interface for a type of product object",
    "ConcreteProduct - defines a product object to be created by the corresponding concrete factory",
    "Client - uses only interfaces declared by AbstractFactory and AbstractProduct classes",
  ],
  collaboration:
    "Normally a single instance of a ConcreteFactory class is created at runtime. This concrete factory creates product objects having a particular implementation. To create different product objects, clients should use a different concrete factory.",
  consequences: {
    pros: [
      "Isolates concrete classes",
      "Makes exchanging product families easy",
      "Promotes consistency among products",
      "Follows Open/Closed Principle",
    ],
    cons: [
      "Difficult to support new kinds of products",
      "Increases complexity with many interfaces and classes",
    ],
  },
  implementation: {
    considerations: [
      "Factories are often implemented as Singletons",
      "Creating products can use Factory Method or Prototype",
      "Consider using dependency injection",
    ],
    tips: [
      "Use dependency injection to provide the factory",
      "Consider defining factories as singletons",
      "Use descriptive names for concrete factories",
      "Document which products belong to which family",
    ],
  },
  useCases: [
    "UI libraries with different themes",
    "Cross-platform applications",
    "Database connection factories",
    "Document generators for different formats",
  ],
  relatedPatterns: ["factory-method", "singleton", "prototype"],
  example: {
    title: "UI Theme Factory",
    description:
      "An abstract factory for creating UI components with different themes.",
    code: `interface Button {
  render(): string;
}

interface Checkbox {
  render(): string;
}

class LightButton implements Button {
  render(): string {
    return 'Light themed button';
  }
}

class DarkButton implements Button {
  render(): string {
    return 'Dark themed button';
  }
}

class LightCheckbox implements Checkbox {
  render(): string {
    return 'Light themed checkbox';
  }
}

class DarkCheckbox implements Checkbox {
  render(): string {
    return 'Dark themed checkbox';
  }
}

interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class LightThemeFactory implements UIFactory {
  createButton(): Button {
    return new LightButton();
  }

  createCheckbox(): Checkbox {
    return new LightCheckbox();
  }
}

class DarkThemeFactory implements UIFactory {
  createButton(): Button {
    return new DarkButton();
  }

  createCheckbox(): Checkbox {
    return new DarkCheckbox();
  }
}

// Usage
function createUI(factory: UIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  console.log(button.render());
  console.log(checkbox.render());
}

console.log('Creating Light Theme UI:');
createUI(new LightThemeFactory());

console.log('\\nCreating Dark Theme UI:');
createUI(new DarkThemeFactory());`,
  },
  code: `interface Button {
  render(): string;
}

interface Checkbox {
  render(): string;
}

class LightButton implements Button {
  render(): string {
    return 'Light themed button';
  }
}

class DarkButton implements Button {
  render(): string {
    return 'Dark themed button';
  }
}

class LightCheckbox implements Checkbox {
  render(): string {
    return 'Light themed checkbox';
  }
}

class DarkCheckbox implements Checkbox {
  render(): string {
    return 'Dark themed checkbox';
  }
}

interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class LightThemeFactory implements UIFactory {
  createButton(): Button {
    return new LightButton();
  }

  createCheckbox(): Checkbox {
    return new LightCheckbox();
  }
}

class DarkThemeFactory implements UIFactory {
  createButton(): Button {
    return new DarkButton();
  }

  createCheckbox(): Checkbox {
    return new DarkCheckbox();
  }
}

// Usage
function createUI(factory: UIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  console.log(button.render());
  console.log(checkbox.render());
}

console.log('Creating Light Theme UI:');
createUI(new LightThemeFactory());

console.log('\\nCreating Dark Theme UI:');
createUI(new DarkThemeFactory());`,
};

export const prototypePattern: Pattern = {
  id: "prototype",
  name: "Prototype",
  category: "creational",
  description:
    "Specifies the kinds of objects to create using a prototypal instance, and creates new objects by copying this prototype.",
  intent:
    "The Prototype pattern specifies the kinds of objects to create using a prototypal instance, and creates new objects by copying this prototype.",
  motivation:
    "When the classes to instantiate are specified at runtime, or to avoid building a class hierarchy of factories that parallels the class hierarchy of products, or when instances of a class can have one of only a few different combinations of state, the Prototype pattern is useful.",
  structure:
    "The pattern declares a cloning interface in all classes that support cloning. Usually it's a single clone method. Concrete prototype classes implement the cloning method.",
  participants: [
    "Prototype - declares an interface for cloning itself",
    "ConcretePrototype - implements an operation for cloning itself",
    "Client - creates a new object by asking a prototype to clone itself",
  ],
  collaboration:
    "A client asks a prototype to clone itself.",
  consequences: {
    pros: [
      "Clones objects without coupling to their concrete classes",
      "Eliminates repeated initialization code",
      "Produces complex objects more conveniently",
      "Alternative to inheritance for handling presets",
    ],
    cons: [
      "Cloning complex objects with circular references can be tricky",
      "Deep copy can be expensive",
    ],
  },
  implementation: {
    considerations: [
      "Decide on shallow vs deep copy",
      "Consider using a prototype registry",
      "Handle circular references carefully",
    ],
    tips: [
      "Use the clone() method to create copies",
      "Consider using Object.assign() or spread operator for shallow copies",
      "For deep copies, use structuredClone() or custom logic",
      "Be careful with objects containing methods",
    ],
  },
  useCases: [
    "Creating objects from a database",
    "Cloning game objects",
    "Copying configuration objects",
    "Creating object templates",
  ],
  relatedPatterns: ["abstract-factory", "composite", "decorator"],
  example: {
    title: "Shape Cloning System",
    description:
      "A prototype system for cloning geometric shapes.",
    code: `interface Cloneable {
  clone(): Cloneable;
}

class Shape implements Cloneable {
  constructor(
    public x: number,
    public y: number,
    public color: string
  ) {}

  clone(): Shape {
    return new Shape(this.x, this.y, this.color);
  }

  display(): string {
    return \`Shape at (\${this.x}, \${this.y}) with color \${this.color}\`;
  }
}

class Circle extends Shape {
  constructor(
    x: number,
    y: number,
    color: string,
    public radius: number
  ) {
    super(x, y, color);
  }

  clone(): Circle {
    return new Circle(this.x, this.y, this.color, this.radius);
  }

  display(): string {
    return \`Circle at (\${this.x}, \${this.y}) with radius \${this.radius} and color \${this.color}\`;
  }
}

// Usage
const originalCircle = new Circle(10, 20, 'red', 5);
console.log('Original:', originalCircle.display());

const clonedCircle = originalCircle.clone();
clonedCircle.x = 30;
clonedCircle.color = 'blue';

console.log('Cloned:', clonedCircle.display());
console.log('Original unchanged:', originalCircle.display());`,
  },
  code: `interface Cloneable {
  clone(): Cloneable;
}

class Shape implements Cloneable {
  constructor(
    public x: number,
    public y: number,
    public color: string
  ) {}

  clone(): Shape {
    return new Shape(this.x, this.y, this.color);
  }

  display(): string {
    return \`Shape at (\${this.x}, \${this.y}) with color \${this.color}\`;
  }
}

class Circle extends Shape {
  constructor(
    x: number,
    y: number,
    color: string,
    public radius: number
  ) {
    super(x, y, color);
  }

  clone(): Circle {
    return new Circle(this.x, this.y, this.color, this.radius);
  }

  display(): string {
    return \`Circle at (\${this.x}, \${this.y}) with radius \${this.radius} and color \${this.color}\`;
  }
}

// Usage
const originalCircle = new Circle(10, 20, 'red', 5);
console.log('Original:', originalCircle.display());

const clonedCircle = originalCircle.clone();
clonedCircle.x = 30;
clonedCircle.color = 'blue';

console.log('Cloned:', clonedCircle.display());
console.log('Original unchanged:', originalCircle.display());`,
};

export const creationalPatterns = [
  singletonPattern,
  factoryMethodPattern,
  builderPattern,
  abstractFactoryPattern,
  prototypePattern,
];
