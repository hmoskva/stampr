import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import FileUpload from "../../components/FileUpload/FIleUpload";
import Header from "../../components/Header/Header";
import styles from "./Index.module.scss";

const IndexPage = () => {
  const headerLinks = [];
  return (
    <div className={`container position-relative ${styles.Main}`}>
      <Header links={headerLinks} />
      <div className="row mt-3">
        <div className="col-12">
          <Card className={`${styles.Hero} p-5`} bgColor="#ace4da45">
            <div className="row justify-content-center">
              <div className="col-6 text-center text-primary">
                <h2 className="fw-bold mb-3">
                  Secure Cloud Storage & Communication
                </h2>
                <span className="fw-light">
                  Get Premium Account today. Check out our awesome deal
                </span>
                <FileUpload className={`${styles.HeroFileUpload} shadow-sm`} />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className={`row justify-content-center ${styles.FooterCard}`}>
        <div className="col-6 ">
          <Card
            bgColor="#ff76762e"
            className="p-5 d-flex justify-content-between align-items-center"
          >
            <span className="text-primary">
              Do you want 50GB Free* storage?
            </span>

            <Button label="Create An Account" className="fw-little" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
