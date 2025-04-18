// /pages/api/upload/index.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Garantir que o diretório de uploads existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Erro ao fazer upload:', err);
          return reject(res.status(500).json({ success: false, message: 'Erro ao fazer upload do arquivo' }));
        }

        const file = files.file;
        if (!file) {
          return reject(res.status(400).json({ success: false, message: 'Nenhum arquivo enviado' }));
        }

        // Verificar tipo de arquivo (apenas imagens)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
          // Remover arquivo inválido
          fs.unlinkSync(file.filepath);
          return reject(res.status(400).json({ 
            success: false, 
            message: 'Tipo de arquivo não permitido. Apenas imagens são aceitas.' 
          }));
        }

        // Gerar nome único para o arquivo
        const uniqueFilename = `${uuidv4()}${path.extname(file.originalFilename)}`;
        const newPath = path.join(uploadDir, uniqueFilename);

        // Renomear arquivo
        fs.renameSync(file.filepath, newPath);

        // Retornar URL do arquivo
        const fileUrl = `/uploads/${uniqueFilename}`;
        
        resolve(res.status(200).json({ 
          success: true, 
          data: { 
            url: fileUrl,
            filename: uniqueFilename,
            originalName: file.originalFilename
          } 
        }));
      });
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
