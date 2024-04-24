export type DisciplinaProps = {
    id: number | string;
    nome: string;
}

export type TelefoneProps = {
    id: number | string;
    numero: string;
    escola: number | string;
}

export type EmailProps = {
    id: number | string;
    endereco: string;
    escola: number | string;
}

export type ItemProps = {
    id: number | string;
    nome: string;
    descricao: string;
}

export type CardapioProps = {
    id: number | string;
    data: Date | string;
    turno: string;
    itens: number[];
    escola: number | string;
    objetos_itens: ItemProps[];
}

export type MuralProps = {
    id: number | string;
    ano: number;
    escola: number | string;
    objetos_avisos: AvisoProps[];
}

export type MinhaEscolaProps = {
    id: number | string;
    cnpj: string;
    nome: string;
    endereco: string;
    num_salas: number | string;
    descricao: string;
    criado_em: Date | string;
    atualizado_em: Date | string;
    imagem: string; 
    objetos_telefones: TelefoneProps[];
    objetos_emails: EmailProps[];
    objetos_cardapios: CardapioProps[];
    objetos_murais: MuralProps[];
}

export type SalaProps = {
    id: number | string;
    numero: number;
    quantidade_alunos: number;
    escola: number | string;
    objeto_escola: MinhaEscolaProps;
}

export type AvaliacaoProps = {
    id: number | string;
    nome: string;
    nota: number;
    confirmar: boolean;
    aluno: number | string;
    disciplina: number | string;
    boletim: number | string;
    objeto_disciplina: DisciplinaProps;
}

export type TransporteProps = {
    id: number | string;
    placa: string;
    ano: number;
    tipo: string;
    nomeMotorista: string;
    nomeAuxiliar: string;
    itinerario: string;
    alunos: number[] | string[];
    objetos_telefones: TelefoneProps[];
}

export type TarefaProps = {
    id: number | string;
    nome: string;
    descricao: string;
    tipo: string;
    cadastrada_em: Date | string;
    entrega: string;
    diaAgenda: number | string;
}

export type AvisoProps = {
    id: number | string;
    titulo: string;
    texto: string;
    publicado_em: Date | string;
    diaAgenda: number | string;
}

export type DiaProps = {
    id: number | string;
    data: Date | string;
    util: boolean;
    disciplinas: number[] | string[];
    agenda: number | string;
    objetos_disciplinas: DisciplinaProps[];
    objetos_avisos: AvisoProps[];
    objetos_tarefas: TarefaProps[];
}

export type AgendaProps = {
    id: number | string;
    turma: number | string;
    objetos_dias: DiaProps[];
}

export type TurmaProps = {
    id: number | string;
    nome: string;
    ano: number;
    turno: string;
    sala: number | string;
    disciplinas: number[];
    objeto_agenda: AgendaProps;
    objetos_disciplinas: DisciplinaProps[];
    objeto_sala: SalaProps;
}

export type RecadoProps = {
    id: number | string;
    texto: string;
    eh_aluno: boolean;
    publicado_em: Date | string;
    pessoa: number | string;
    agenda: number | string;
}

export type AgendaRecadosProps = {
    id: number | string;
    boletim: number | string;
    objetos_recados: RecadoProps[];
}

export type DiaLetivoProps = {
    id: number | string;
    data: Date | string;
    presenca: boolean;
    frequencia: number | string;
}

export type FrequenciaProps = {
    id: number | string;
    percentual: number;
    boletim: number | string;
    objetos_diasletivos: DiaLetivoProps[];
}

export type MediaProps = {
    id: number | string;
    tipo: string;
    valor: number;
    disciplina: number | string;
    boletim: number | string;
    objeto_disciplina: DisciplinaProps;
}

export type SituacaoProps = {
    id: number | string;
    situacao: string;
    finalizar: boolean;
    disciplina: number | string;
    boletim: number | string;
    objeto_disciplina: DisciplinaProps;
}

export type BoletimProps = {
    id: number | string;
    aluno: number | string;
    status: string;
    encerrar: boolean;
    qr_code: string;
    turma: number | string;
    objeto_turma: TurmaProps;
    objeto_frequencia: FrequenciaProps;
    objetos_avaliacoes: AvaliacaoProps[];
    objetos_medias: MediaProps[];
    objetos_situacoes: SituacaoProps[];
    objeto_agenda: AgendaRecadosProps;
}

export type UserProps = {
    id: number | string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

export type ResponsavelProps = {
    id: number | string;
    cpf: string;
    nome: string;
    observacao: string;
    aluno: number | string;
}

export type AlunoProps = {
    id: number | string;
    matricula: string;
    cpf: string;
    data_nascimento: string;
    endereco: string;
    eh_pcd: boolean;
    retrato: string;
    objeto_usuario: UserProps;
    objetos_telefones: TelefoneProps[];
    objetos_emails: EmailProps[];
    objetos_responsaveis: ResponsavelProps[];
    objetos_boletins: BoletimProps[];
    objetos_transportes: TransporteProps[];
}