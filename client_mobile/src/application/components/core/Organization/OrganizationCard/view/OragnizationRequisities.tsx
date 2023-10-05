import { useEffect, useState } from "react";
import ModalCard from "../../../../common/Modals/ModalCard";
import axios from "axios";
import { organizationModel } from "../../../../../../modules/OrganizationModule/organization.module";
import {
    IRequisitiesOrganization
} from "../../../../../../modules/OrganizationModule/Organization/interfaces/organization.type";

const OragnizationRequisities = () => {
    const [modal, setModal] = useState(false)
    const [data, setData] = useState<null | IRequisitiesOrganization>(null)
    console.log(organizationModel.selectOrganization?.guid, 'ID ORGS');

    const getGoodPlaceId = async (id: string) => {
        try {
            console.log('ID', id);
            const res = await axios.get<any>(`http://localhost:6500/organization_goodplace/buorg?id=${id}`)
            console.log(res.data, 'GOODPLACE');
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const getRequisities = async () => {
            try {
                const res = await axios.get<IRequisitiesOrganization>(`http://localhost:5000/organization/recvisites?organizationId=${organizationModel.selectOrganization?.guid}`)
                setData(res.data)
            } catch (e) {
                console.log(e);
            }
        }

        getRequisities()
    }, [])

    useEffect(() => {
        if(organizationModel.selectOrganization) {
            getGoodPlaceId(organizationModel.selectOrganization.guid)
        }
    }, [organizationModel.selectOrganization])

    return (
        <div>
            {
                (data && Object.keys(data).length !== 0) && <div onClick={() => setModal(true)} className="recvisites">Реквизиты компаний</div>
            }

            {
                modal && (
                    <ModalCard setIsOpened={setModal}>

                        <div className="modal__wrapper">
                            <div className="modal__header">
                                <svg className="no-drag" onClick={() => setModal(false)} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.3 17.71C29.91 17.32 29.28 17.32 28.89 17.71L24 22.59L19.11 17.7C18.72 17.31 18.09 17.31 17.7 17.7C17.31 18.09 17.31 18.72 17.7 19.11L22.59 24L17.7 28.89C17.31 29.28 17.31 29.91 17.7 30.3C18.09 30.69 18.72 30.69 19.11 30.3L24 25.41L28.89 30.3C29.28 30.69 29.91 30.69 30.3 30.3C30.69 29.91 30.69 29.28 30.3 28.89L25.41 24L30.3 19.11C30.68 18.73 30.68 18.09 30.3 17.71Z" fill="#8D191D" />
                                </svg>
                                <h3>Реквизиты</h3>
                            </div>
                            <div className="modal__content gap-8">
                                <div className='word-bold'>
                                    <b>ИП: </b>
                                    {data?.name}
                                </div>
                                <div className='ur-address'>Юридический адрес:</div>
                                <div className='data-company'>
                                    <div>
                                        ОГРН {data?.ogrn}
                                    </div>
                                    <div>
                                        ИНН {data?.inn}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalCard>
                )
            }
        </div>
    );
};

export default OragnizationRequisities;