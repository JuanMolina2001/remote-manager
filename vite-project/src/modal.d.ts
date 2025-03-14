interface PyMessageEvent extends Event {
    detail: {
      message: string;
      suggestions: Array<{
        value: string;
        description: string;
      }>;
    };
  }