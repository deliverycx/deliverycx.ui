import { FC, useContext, useState } from 'react';
import ModalCard from '../../Modals/ModalCard';
import DeliveryAdressSelect from './DeliveryAdressSelect';
import { Field, FormikProvider, useFormik } from 'formik';
import { shemaAdress } from 'application/helpers/validationSchema';
import FormFieldWrapper from '../../Forms/FormFieldWrapper';
import { DeliveryMapContext } from './HOC.DeliveryMap';
import { useEffect } from 'react';
import { Mobile } from 'application/ResponseMedia';
import { Desktop } from 'application/ResponseMedia';
import { useNavigate } from 'react-router-dom';

type IProps = {
  openModalAdress?: boolean;
  setModalStreet: any;
};

const DeliveryAdress: FC<IProps> = ({ openModalAdress, setModalStreet }) => {
  const [modalAdress, setModalAdress] = useState(openModalAdress || false);

  const useCaseYMap = useContext(DeliveryMapContext);
  const { stateReduceMap, formik, point } = useCaseYMap.data;
  const { geoCodeAdress, onMapTyping } = useCaseYMap.handlers;

  const navigate = useNavigate();

  useEffect(() => {
    if (stateReduceMap.valueMap) {
      geoCodeAdress(`${formik.values.address},${formik.values.house}`);
    }
  }, [stateReduceMap.valueMap, formik.values.address, formik.values.house]);

  useEffect(() => {
    if (
      stateReduceMap.clickValueMap &&
      stateReduceMap.clickValueMap.length > 1
    ) {
      setModalStreet(true);
    }
  }, [stateReduceMap.clickValueMap]);

  return (
    <>
      <Mobile>
        {stateReduceMap.notificate && (
          <div className="maps_notificate">Адрес в базе, не найден</div>
        )}
        <div className="modal">
          <div className="modal__wrapper ">
            <div className="modal__content gap-8">
              <button
                className="btn btn-sm btn-red no-drag"
                onClick={() => setModalAdress(true)}
              >
                Показать
              </button>
            </div>
          </div>
        </div>
        {modalAdress && (
          <div className="modal">
            <div className="modal__wrapper">
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <div className="modal__content modal__fix gap-8">
                    <div className="adress_fild">
                      <div className="d-flex flex-center gap-8">
                        <div className="input__item flex-big no-drag">
                          <FormFieldWrapper
                            placeholderValue="Где"
                            isValid={formik.values.address}
                            error={!!formik.errors.address}
                            errorValue={formik.errors.address}
                          >
                            <div
                              className="input__container"
                              onClick={() => setModalStreet(true)}
                            >
                              <Field
                                className="form__field-wrapper__input gray"
                                name="address"
                                placeholder="Улица"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                              />
                            </div>
                          </FormFieldWrapper>
                        </div>
                        <div className="input__item flex-small no-drag">
                          <FormFieldWrapper
                            placeholderValue="Где"
                            isValid={formik.values.house}
                            error={!!formik.errors.house}
                            errorValue={formik.errors.house}
                          >
                            <div className="input__container">
                              <Field
                                className="form__field-wrapper__input gray"
                                name="house"
                                placeholder="Дом"
                                value={formik.values.house}
                                onChange={formik.handleChange}
                              />
                            </div>
                          </FormFieldWrapper>
                        </div>
                      </div>
                      <div className="d-flex flex-center gap-8">
                        <div className="input__item">
                          <div className="input__container">
                            <Field
                              className="form__field-wrapper__input gray"
                              name="flat"
                              placeholder="кв / офис"
                              value={formik.values.flat}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>

                        <div className="input__item">
                          <div className="input__container">
                            <Field
                              className="form__field-wrapper__input gray"
                              name="entrance"
                              placeholder="подъезд"
                              value={formik.values.entrance}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                        <div className="input__item">
                          <div className="input__container">
                            <Field
                              className="form__field-wrapper__input gray floor"
                              name="floor"
                              placeholder="этаж"
                              value={formik.values.floor}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {stateReduceMap.disclaimer ? (
                      <button disabled className="btn btn-sm btn-gray no-drag">
                        Не верный адрес
                      </button>
                    ) : (
                      <input
                        type="submit"
                        className="btn btn-sm btn-red no-drag"
                        value="Сохранить"
                      />
                    )}

                    <button
                      className="btn btn-sm btn-gray no-drag"
                      onClick={() => navigate(-1)}
                    >
                      Скрыть
                    </button>
                  </div>
                </form>
              </FormikProvider>
            </div>
          </div>
        )}
      </Mobile>
      <Desktop>
        {stateReduceMap.notificate && (
          <div className="maps_notificate">Адрес в базе, не найден</div>
        )}
        <div className="modal__wrapper">
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal__content modal__fix gap-8">
                <div className="adress_fild">
                  <div className="d-flex flex-center gap-8">
                    <div className="input__item flex-big no-drag">
                      <FormFieldWrapper
                        placeholderValue="Где"
                        isValid={formik.values.address}
                        error={!!formik.errors.address}
                        errorValue={formik.errors.address}
                      >
                        <div
                          className="input__container"
                          onClick={() => setModalStreet(true)}
                        >
                          <Field
                            className="form__field-wrapper__input gray"
                            name="address"
                            placeholder="Улица"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </FormFieldWrapper>
                    </div>
                    <div className="input__item flex-small no-drag">
                      <FormFieldWrapper
                        placeholderValue="Где"
                        isValid={formik.values.house}
                        error={!!formik.errors.house}
                        errorValue={formik.errors.house}
                      >
                        <div className="input__container">
                          <Field
                            className="form__field-wrapper__input gray"
                            name="house"
                            placeholder="Дом"
                            value={formik.values.house}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </FormFieldWrapper>
                    </div>
                  </div>
                  <div className="d-flex flex-center gap-8">
                    <div className="input__item">
                      <div className="input__container">
                        <Field
                          className="form__field-wrapper__input gray"
                          name="flat"
                          placeholder="кв / офис"
                          value={formik.values.flat}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>

                    <div className="input__item">
                      <div className="input__container">
                        <Field
                          className="form__field-wrapper__input gray"
                          name="entrance"
                          placeholder="подъезд"
                          value={formik.values.entrance}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="input__item">
                      <div className="input__container">
                        <Field
                          className="form__field-wrapper__input gray floor"
                          name="floor"
                          placeholder="этаж"
                          value={formik.values.floor}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {stateReduceMap.disclaimer ? (
                  <button disabled className="btn btn-sm btn-gray no-drag">
                    Не верный адрес
                  </button>
                ) : (
                  <input
                    type="submit"
                    className="btn btn-sm btn-red no-drag"
                    value="Сохранить"
                  />
                )}
              </div>
            </form>
          </FormikProvider>
        </div>
      </Desktop>
    </>
  );
};
export default DeliveryAdress;
