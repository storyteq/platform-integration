import { BaseFrameController } from './BaseFrameController';

export const AVAILABLE_CREATE_MEDIA_EVENTS: ['loaded', 'created', 'batch-created', 'canceled'] = [
  'loaded',
  'created',
  'batch-created',
  'canceled',
];

export interface ICreateMediaConfig {
  creationType?: 'batch' | 'batch-edit' | 'batch-copy';
  batchId?: number;
  publish?: Array<{ type: string; variant?: string; parameters?: Array<string> }>; // Upon rendering completion, publish to this channel
  notifications?: Array<{ type?: string; route?: string }>; // Will send a notification to the target route upon media status change with the full media object
  mediaRecreateHash?: string;
  ui?: {
    customizationItems?: Array<{ item: string; value: string | boolean }>;
    endScreenActions?: Array<{ action: string; value: string }>;
    forceMediaPreviewBeforeCreate?: 'on_first_render' | 'always';
  }; // Customize the UI
}

export class CreateMediaPage extends BaseFrameController<typeof AVAILABLE_CREATE_MEDIA_EVENTS> {
  constructor(
    spawnElement: string,
    STAuthToken: string | false,
    templateId: number,
    companyId: number,
    config: ICreateMediaConfig = {}
  ) {
    const page = `/integration`;

    super(spawnElement, STAuthToken, page, JSON.stringify(config), AVAILABLE_CREATE_MEDIA_EVENTS, {
      companyId: `${companyId}`,
      templateId: `${templateId}`,
    });
  }
}
