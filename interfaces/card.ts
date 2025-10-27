export interface CardDTO {
  nombre_titular: string;
  numero_enc: string;
  cvv_enc: string;
  expiracion: string;
  last4: string;
  usuario_id: string;
  documentType?: string;
  documentNumber?: string;
}