import { Pattern } from "@/types/pattern";

export const decoratorPattern: Pattern = {
  id: "decorator",
  name: "Decorator",
  category: "structural",
  description:
    "Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.",
  intent:
    "The Decorator pattern attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.",
  motivation:
    "Sometimes you want to add responsibilities to individual objects, not to an entire class. Inheritance isn't always flexible enough because it requires creating a new class for each combination of features. The Decorator pattern provides a flexible alternative.",
  structure:
    "The pattern involves a Component interface, ConcreteComponent that implements it, and Decorator classes that wrap the component and add new behavior.",
  participants: [
    "Component - defines the interface for objects that can have responsibilities added to them",
    "ConcreteComponent - defines an object to which additional responsibilities can be attached",
    "Decorator - maintains a reference to a Component object and defines an interface that conforms to Component's interface",
    "ConcreteDecorator - adds responsibilities to the component",
  ],
  collaboration:
    "Decorator forwards requests to its Component object and may perform additional operations before or after forwarding the request.",
  consequences: {
    pros: [
      "More flexible than static inheritance",
      "Avoids feature-laden classes high up in the hierarchy",
      "Responsibilities can be added and removed at runtime",
      "Follows Single Responsibility and Open/Closed Principles",
    ],
    cons: [
      "Can result in many small objects",
      "Can be complicated to configure",
      "Decorators and their components are not identical",
    ],
  },
  implementation: {
    considerations: [
      "Keep the Component interface simple",
      "Decide on the decorator interface",
      "Consider making decorators transparent",
      "Think about the order of decoration",
    ],
    tips: [
      "Use composition over inheritance",
      "Keep decorators focused on a single responsibility",
      "Consider using abstract decorator classes",
      "Document the decoration order if it matters",
    ],
  },
  useCases: [
    "Adding scrolling to GUI components",
    "Adding borders or styling to UI elements",
    "Data stream processing (encryption, compression)",
    "Adding features to coffee orders",
    "Enhancing HTTP requests/responses",
  ],
  relatedPatterns: [
    "adapter",
    "composite",
    "strategy",
  ],
  example: {
    title: "Coffee Shop Ordering System",
    description:
      "A coffee shop system where you can add various condiments to a base coffee order.",
    code: `interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return 'Simple coffee';
  }
}

class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 2;
  }

  description(): string {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 1;
  }

  description(): string {
    return this.coffee.description() + ', sugar';
  }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
console.log(\`\${coffee.description()} costs $\${coffee.cost()}\`);

coffee = new MilkDecorator(coffee);
console.log(\`\${coffee.description()} costs $\${coffee.cost()}\`);

coffee = new SugarDecorator(coffee);
console.log(\`\${coffee.description()} costs $\${coffee.cost()}\`);`,
  },
  code: `interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return 'Simple coffee';
  }
}

class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 2;
  }

  description(): string {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 1;
  }

  description(): string {
    return this.coffee.description() + ', sugar';
  }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
console.log(\`\${coffee.description()} costs $\${coffee.cost()}\`);

coffee = new MilkDecorator(coffee);
console.log(\`\${coffee.description()} costs $\${coffee.cost()}\`);

coffee = new SugarDecorator(coffee);
console.log(\`\${coffee.description()} costs $\${coffee.cost()}\`);`,
};

export const adapterPattern: Pattern = {
  id: "adapter",
  name: "Adapter",
  category: "structural",
  description:
    "Converts the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.",
  intent:
    "The Adapter pattern converts the interface of a class into another interface that clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces.",
  motivation:
    "Sometimes you want to use an existing class, but its interface doesn't match the one you need. The Adapter pattern lets you wrap the existing class with a new interface.",
  structure:
    "The pattern involves a Target interface, an Adaptee class with an incompatible interface, and an Adapter that makes the Adaptee's interface compatible with the Target interface.",
  participants: [
    "Target - defines the domain-specific interface that Client uses",
    "Adapter - adapts the interface of Adaptee to the Target interface",
    "Adaptee - defines an existing interface that needs adapting",
    "Client - collaborates with objects conforming to the Target interface",
  ],
  collaboration:
    "Clients call operations on an Adapter instance. The adapter calls Adaptee operations to carry out the request.",
  consequences: {
    pros: [
      "Follows Single Responsibility Principle",
      "Follows Open/Closed Principle",
      "Increases reusability of existing code",
      "Improves flexibility",
    ],
    cons: [
      "Increases overall code complexity",
      "Sometimes it's simpler to change the service class",
    ],
  },
  implementation: {
    considerations: [
      "Decide whether to use class or object adapter",
      "Consider how much adapting is needed",
      "Think about two-way adapters",
    ],
    tips: [
      "Use composition over inheritance",
      "Keep the adapter focused on interface conversion",
      "Consider using multiple adapters for complex conversions",
      "Document what interfaces are being adapted",
    ],
  },
  useCases: [
    "Integrating legacy code with new systems",
    "Working with third-party libraries",
    "Converting data formats",
    "Adapting payment gateways",
    "Database driver abstraction",
  ],
  relatedPatterns: [
    "decorator",
    "proxy",
  ],
  example: {
    title: "Payment Gateway Adapter",
    description:
      "An adapter that converts a legacy payment system interface to work with a modern payment processor interface.",
    code: `interface ModernPayment {
  processPayment(amount: number, currency: string): string;
}

class LegacyPaymentSystem {
  makePayment(dollars: number): string {
    return \`Legacy system processed $\${dollars}\`;
  }
}

class PaymentAdapter implements ModernPayment {
  constructor(private legacySystem: LegacyPaymentSystem) {}

  processPayment(amount: number, currency: string): string {
    if (currency !== 'USD') {
      return \`Currency \${currency} not supported by legacy system\`;
    }
    return this.legacySystem.makePayment(amount);
  }
}

// Usage
const legacySystem = new LegacyPaymentSystem();
const adapter = new PaymentAdapter(legacySystem);

console.log(adapter.processPayment(100, 'USD'));
console.log(adapter.processPayment(50, 'EUR'));`,
  },
  code: `interface ModernPayment {
  processPayment(amount: number, currency: string): string;
}

class LegacyPaymentSystem {
  makePayment(dollars: number): string {
    return \`Legacy system processed $\${dollars}\`;
  }
}

class PaymentAdapter implements ModernPayment {
  constructor(private legacySystem: LegacyPaymentSystem) {}

  processPayment(amount: number, currency: string): string {
    if (currency !== 'USD') {
      return \`Currency \${currency} not supported by legacy system\`;
    }
    return this.legacySystem.makePayment(amount);
  }
}

// Usage
const legacySystem = new LegacyPaymentSystem();
const adapter = new PaymentAdapter(legacySystem);

console.log(adapter.processPayment(100, 'USD'));
console.log(adapter.processPayment(50, 'EUR'));`,
};

export const compositePattern: Pattern = {
  id: "composite",
  name: "Composite",
  category: "structural",
  description:
    "Composes objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.",
  intent:
    "The Composite pattern composes objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.",
  motivation:
    "When you want to represent part-whole hierarchies of objects and you want clients to be able to ignore the difference between compositions of objects and individual objects, the Composite pattern is useful.",
  structure:
    "The pattern involves a Component interface that declares operations common to both simple and complex objects. Leaf classes represent end objects with no children. Composite classes represent complex components that may have children.",
  participants: [
    "Component - declares the interface for objects in the composition",
    "Leaf - represents leaf objects in the composition with no children",
    "Composite - defines behavior for components having children and stores child components",
    "Client - manipulates objects in the composition through the Component interface",
  ],
  collaboration:
    "Clients use the Component interface to interact with objects in the composite structure. If the recipient is a Leaf, the request is handled directly. If the recipient is a Composite, it usually forwards requests to its child components.",
  consequences: {
    pros: [
      "Defines class hierarchies with primitive and composite objects",
      "Makes it easier to add new kinds of components",
      "Provides flexibility of structure",
      "Follows Open/Closed Principle",
    ],
    cons: [
      "Can make the design overly general",
      "Difficult to restrict components of a composite",
    ],
  },
  implementation: {
    considerations: [
      "Decide where to define child management operations",
      "Consider using Component reference for parent",
      "Think about ordering of children",
      "Consider caching for performance",
    ],
    tips: [
      "Keep the Component interface focused",
      "Use type checking carefully when needed",
      "Consider iterator pattern for traversing",
      "Document the tree structure clearly",
    ],
  },
  useCases: [
    "File system hierarchies",
    "GUI component trees",
    "Organization structures",
    "Graphics scene graphs",
    "Menu systems",
  ],
  relatedPatterns: ["decorator"],
  example: {
    title: "File System",
    description:
      "A file system with files and directories that can contain other files and directories.",
    code: `interface FileSystemItem {
  getName(): string;
  getSize(): number;
  display(indent: string): void;
}

class File implements FileSystemItem {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  display(indent: string = ''): void {
    console.log(\`\${indent}- File: \${this.name} (\${this.size}KB)\`);
  }
}

class Directory implements FileSystemItem {
  private children: FileSystemItem[] = [];

  constructor(private name: string) {}

  add(item: FileSystemItem): void {
    this.children.push(item);
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }

  display(indent: string = ''): void {
    console.log(\`\${indent}+ Directory: \${this.name} (\${this.getSize()}KB total)\`);
    this.children.forEach(child => child.display(indent + '  '));
  }
}

// Usage
const root = new Directory('root');
const documents = new Directory('documents');
const pictures = new Directory('pictures');

documents.add(new File('resume.pdf', 50));
documents.add(new File('letter.doc', 30));

pictures.add(new File('photo1.jpg', 200));
pictures.add(new File('photo2.jpg', 180));

root.add(documents);
root.add(pictures);
root.add(new File('readme.txt', 10));

root.display();`,
  },
  code: `interface FileSystemItem {
  getName(): string;
  getSize(): number;
  display(indent: string): void;
}

class File implements FileSystemItem {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  display(indent: string = ''): void {
    console.log(\`\${indent}- File: \${this.name} (\${this.size}KB)\`);
  }
}

class Directory implements FileSystemItem {
  private children: FileSystemItem[] = [];

  constructor(private name: string) {}

  add(item: FileSystemItem): void {
    this.children.push(item);
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }

  display(indent: string = ''): void {
    console.log(\`\${indent}+ Directory: \${this.name} (\${this.getSize()}KB total)\`);
    this.children.forEach(child => child.display(indent + '  '));
  }
}

// Usage
const root = new Directory('root');
const documents = new Directory('documents');
const pictures = new Directory('pictures');

documents.add(new File('resume.pdf', 50));
documents.add(new File('letter.doc', 30));

pictures.add(new File('photo1.jpg', 200));
pictures.add(new File('photo2.jpg', 180));

root.add(documents);
root.add(pictures);
root.add(new File('readme.txt', 10));

root.display();`,
};

export const facadePattern: Pattern = {
  id: "facade",
  name: "Facade",
  category: "structural",
  description:
    "Provides a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.",
  intent:
    "The Facade pattern provides a unified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes the subsystem easier to use.",
  motivation:
    "When you want to provide a simple interface to a complex subsystem, or you want to layer your subsystems, the Facade pattern is useful. It shields clients from subsystem components.",
  structure:
    "The pattern involves a Facade class that provides simple methods to complex subsystem functionality. The Facade delegates client requests to appropriate subsystem objects.",
  participants: [
    "Facade - knows which subsystem classes are responsible for a request and delegates client requests",
    "Subsystem classes - implement subsystem functionality and handle work assigned by the Facade",
  ],
  collaboration:
    "Clients communicate with the subsystem by sending requests to the Facade, which forwards them to the appropriate subsystem objects. Clients don't have to deal with subsystem objects directly.",
  consequences: {
    pros: [
      "Shields clients from subsystem components",
      "Promotes weak coupling",
      "Simplifies the interface",
      "Allows for easier testing",
    ],
    cons: [
      "Can become a god object",
      "May limit access to advanced features",
    ],
  },
  implementation: {
    considerations: [
      "Decide what functionality to expose",
      "Consider making facade optional",
      "Think about subsystem initialization",
      "Plan for subsystem evolution",
    ],
    tips: [
      "Keep the facade interface simple and focused",
      "Don't prevent access to subsystem if needed",
      "Consider using facade as a singleton",
      "Document what the facade simplifies",
    ],
  },
  useCases: [
    "Complex library APIs",
    "Home theater systems",
    "Compiler subsystems",
    "Database connection management",
    "Video conversion frameworks",
  ],
  relatedPatterns: ["adapter", "abstract-factory"],
  example: {
    title: "Home Theater System",
    description:
      "A facade that simplifies the operation of a complex home theater system.",
    code: `class Amplifier {
  turnOn(): void {
    console.log('Amplifier on');
  }

  setVolume(level: number): void {
    console.log(\`Volume set to \${level}\`);
  }

  turnOff(): void {
    console.log('Amplifier off');
  }
}

class DVDPlayer {
  turnOn(): void {
    console.log('DVD Player on');
  }

  play(movie: string): void {
    console.log(\`Playing "\${movie}"\`);
  }

  turnOff(): void {
    console.log('DVD Player off');
  }
}

class Projector {
  turnOn(): void {
    console.log('Projector on');
  }

  wideScreenMode(): void {
    console.log('Projector in widescreen mode');
  }

  turnOff(): void {
    console.log('Projector off');
  }
}

class HomeTheaterFacade {
  constructor(
    private amp: Amplifier,
    private dvd: DVDPlayer,
    private projector: Projector
  ) {}

  watchMovie(movie: string): void {
    console.log('Get ready to watch a movie...\\n');
    this.projector.turnOn();
    this.projector.wideScreenMode();
    this.amp.turnOn();
    this.amp.setVolume(5);
    this.dvd.turnOn();
    this.dvd.play(movie);
  }

  endMovie(): void {
    console.log('\\nShutting down movie theater...\\n');
    this.dvd.turnOff();
    this.amp.turnOff();
    this.projector.turnOff();
  }
}

// Usage
const homeTheater = new HomeTheaterFacade(
  new Amplifier(),
  new DVDPlayer(),
  new Projector()
);

homeTheater.watchMovie('Inception');
homeTheater.endMovie();`,
  },
  code: `class Amplifier {
  turnOn(): void {
    console.log('Amplifier on');
  }

  setVolume(level: number): void {
    console.log(\`Volume set to \${level}\`);
  }

  turnOff(): void {
    console.log('Amplifier off');
  }
}

class DVDPlayer {
  turnOn(): void {
    console.log('DVD Player on');
  }

  play(movie: string): void {
    console.log(\`Playing "\${movie}"\`);
  }

  turnOff(): void {
    console.log('DVD Player off');
  }
}

class Projector {
  turnOn(): void {
    console.log('Projector on');
  }

  wideScreenMode(): void {
    console.log('Projector in widescreen mode');
  }

  turnOff(): void {
    console.log('Projector off');
  }
}

class HomeTheaterFacade {
  constructor(
    private amp: Amplifier,
    private dvd: DVDPlayer,
    private projector: Projector
  ) {}

  watchMovie(movie: string): void {
    console.log('Get ready to watch a movie...\\n');
    this.projector.turnOn();
    this.projector.wideScreenMode();
    this.amp.turnOn();
    this.amp.setVolume(5);
    this.dvd.turnOn();
    this.dvd.play(movie);
  }

  endMovie(): void {
    console.log('\\nShutting down movie theater...\\n');
    this.dvd.turnOff();
    this.amp.turnOff();
    this.projector.turnOff();
  }
}

// Usage
const homeTheater = new HomeTheaterFacade(
  new Amplifier(),
  new DVDPlayer(),
  new Projector()
);

homeTheater.watchMovie('Inception');
homeTheater.endMovie();`,
};

export const proxyPattern: Pattern = {
  id: "proxy",
  name: "Proxy",
  category: "structural",
  description:
    "Provides a surrogate or placeholder for another object to control access to it.",
  intent:
    "The Proxy pattern provides a surrogate or placeholder for another object to control access to it.",
  motivation:
    "When you need to control access to an object, add additional functionality when accessing an object, or delay the creation of an expensive object, the Proxy pattern is useful.",
  structure:
    "The pattern involves a Proxy class that controls access to the real subject. Both Proxy and RealSubject implement the same interface, so the proxy can be used anywhere the real subject is expected.",
  participants: [
    "Subject - defines the common interface for RealSubject and Proxy",
    "RealSubject - defines the real object that the proxy represents",
    "Proxy - maintains a reference to the RealSubject and controls access to it",
  ],
  collaboration:
    "Proxy forwards requests to RealSubject when appropriate, depending on the kind of proxy.",
  consequences: {
    pros: [
      "Controls access to the object",
      "Can add functionality without changing the object",
      "Supports lazy initialization",
      "Follows Open/Closed Principle",
    ],
    cons: [
      "Increases complexity",
      "May introduce latency",
    ],
  },
  implementation: {
    considerations: [
      "Decide what type of proxy (virtual, protection, remote, etc.)",
      "Consider thread safety for virtual proxies",
      "Think about caching strategies",
      "Plan for error handling",
    ],
    tips: [
      "Keep the proxy interface identical to the subject",
      "Consider using lazy initialization",
      "Document what the proxy adds or restricts",
      "Use proxies for cross-cutting concerns",
    ],
  },
  useCases: [
    "Lazy loading of resources",
    "Access control and security",
    "Remote object access",
    "Caching expensive operations",
    "Logging and monitoring",
  ],
  relatedPatterns: ["adapter", "decorator"],
  example: {
    title: "Image Loading Proxy",
    description:
      "A proxy that delays loading an expensive image until it's actually needed.",
    code: `interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private filename: string) {
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(\`Loading image from disk: \${this.filename}\`);
  }

  display(): void {
    console.log(\`Displaying image: \${this.filename}\`);
  }
}

class ImageProxy implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Usage
console.log('Creating image proxies...');
const image1 = new ImageProxy('photo1.jpg');
const image2 = new ImageProxy('photo2.jpg');

console.log('\\nDisplaying first image:');
image1.display();

console.log('\\nDisplaying first image again:');
image1.display();

console.log('\\nDisplaying second image:');
image2.display();`,
  },
  code: `interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private filename: string) {
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(\`Loading image from disk: \${this.filename}\`);
  }

  display(): void {
    console.log(\`Displaying image: \${this.filename}\`);
  }
}

class ImageProxy implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Usage
console.log('Creating image proxies...');
const image1 = new ImageProxy('photo1.jpg');
const image2 = new ImageProxy('photo2.jpg');

console.log('\\nDisplaying first image:');
image1.display();

console.log('\\nDisplaying first image again:');
image1.display();

console.log('\\nDisplaying second image:');
image2.display();`,
};

export const structuralPatterns = [
  decoratorPattern,
  adapterPattern,
  compositePattern,
  facadePattern,
  proxyPattern,
];
