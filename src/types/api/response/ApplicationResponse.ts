export interface ApiApplication {
    id: string | undefined;
    resumeId: string;
    userId: string;
    applicationUrl: string;
    extraDetails: string;
    status: string;
    createAt: Date;
    updatedAt: Date;
  }
  