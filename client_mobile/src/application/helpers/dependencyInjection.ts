// Контейнер зависимостей
class DependencyContainer {
  private dependencies: Map<string, any> = new Map();

  register(dependency: any) {
    if (!this.dependencies.has(dependency.name)) {
      this.dependencies.set(dependency.name, new dependency());
    } else {
      console.warn(
        `Dependency with name ${dependency.name} is already registered.`,
      );
    }
  }

  registerFabric(dependency: any, provider: any[]) {
    const constructorArgs = provider.map((clazz) => this.resolve(clazz));

    if (!this.dependencies.has(dependency.name)) {
      this.dependencies.set(
        dependency.name,
        new dependency(...constructorArgs),
      );
    }
  }

  resolve<T>(clazz: any): T {
    if (this.dependencies.has(clazz.name)) {
      return this.dependencies.get(clazz.name);
    }
    throw new Error(`Dependency ${clazz.name} not found.`);
  }
}

// Создаем экземпляр контейнера зависимостей
const container = new DependencyContainer();

export function InjectableDI(fabric?: any[]) {
  return function (target: any) {
    // Регистрация сервиса в контейнере зависимостей
    if (fabric) {
      container.registerFabric(target, fabric);
    } else {
      container.register(target);
    }

    // Возвращаем оригинальный класс
    return target;
  };
}

export const adapterResolveDI = (resolve: any): typeof resolve => {
  return container.resolve<typeof resolve>(resolve);
};
